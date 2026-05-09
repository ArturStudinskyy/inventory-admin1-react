import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ConfirmModal from '../components/ConfirmModal'
import InventoryTable from '../components/inventory/InventoryTable'
import { inventoryApi } from '../services/inventoryApi'
import styles from './AdminInventory.module.css'

function AdminInventory() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [deleteError, setDeleteError] = useState('')
    const [pendingDelete, setPendingDelete] = useState(null)
    const [isDeleting, setIsDeleting] = useState(false)

    const loadInventory = async () => {
        setIsLoading(true)
        setError('')

        try {
            const response = await inventoryApi.getAll()
            const data = response.data
            const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? []
            setItems(list)
        } catch (loadError) {
            setError(loadError?.message ?? 'Не вдалося завантажити інвентар')
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadInventory()
    }, [])

    const handleDeleteClick = (item) => {
        setPendingDelete(item)
        setDeleteError('')
    }

    const handleDeleteCancel = () => {
        if (isDeleting) {
            return
        }

        setPendingDelete(null)
    }

    const handleDeleteConfirm = async () => {
        if (!pendingDelete || isDeleting) {
            return
        }

        setIsDeleting(true)
        setDeleteError('')

        try {
            await inventoryApi.remove(pendingDelete.id)
            setItems((current) => current.filter((item) => item.id !== pendingDelete.id))
            setPendingDelete(null)
        } catch (removeError) {
            setDeleteError(removeError?.message ?? 'Не вдалося видалити елемент')
        } finally {
            setIsDeleting(false)
        }
    }

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <h1 className={styles.title}>Інвентар</h1>
                <Link className={styles.primaryLink} to="/inventory/new">
                    Додати інвентар
                </Link>
            </div>

            {deleteError ? <div className={styles.error}>{deleteError}</div> : null}

            <InventoryTable
                items={items}
                isLoading={isLoading}
                error={error}
                renderActions={(item) => (
                    <>
                        <Link className={styles.actionLink} to={`/inventory/${item.id}`}>
                            Переглянути
                        </Link>
                        <Link
                            className={styles.actionLink}
                            to={`/inventory/${item.id}/edit`}
                        >
                            Редагувати
                        </Link>
                        <button
                            type="button"
                            className={styles.dangerButton}
                            onClick={() => handleDeleteClick(item)}
                        >
                            Видалити
                        </button>
                    </>
                )}
            />

            <ConfirmModal
                isOpen={Boolean(pendingDelete)}
                title="Видалити інвентар"
                message={
                    pendingDelete
                        ? `Видалити "${pendingDelete.inventory_name}"?`
                        : undefined
                }
                confirmLabel={isDeleting ? 'Видалення...' : 'Видалити'}
                onConfirm={handleDeleteConfirm}
                onCancel={handleDeleteCancel}
            />
        </section>
    )
}

export default AdminInventory
