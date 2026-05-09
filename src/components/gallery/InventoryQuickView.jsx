import { useEffect, useState } from 'react'
import { API_BASE_URL, inventoryApi } from '../../services/inventoryApi'
import styles from './InventoryQuickView.module.css'

function InventoryQuickView({ itemId, isOpen, onClose }) {
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!isOpen || !itemId) {
            return
        }

        let isActive = true

        setIsLoading(true)
        setError('')

        inventoryApi
            .getById(itemId)
            .then((response) => {
                if (!isActive) {
                    return
                }

                setItem(response.data)
            })
            .catch((err) => {
                if (!isActive) {
                    return
                }

                setError(err?.message ?? 'Не вдалося завантажити предмет')
            })
            .finally(() => {
                if (!isActive) {
                    return
                }

                setIsLoading(false)
            })

        return () => {
            isActive = false
        }
    }, [isOpen, itemId])

    if (!isOpen) {
        return null
    }

    return (
        <div className={styles.backdrop} onClick={onClose} role="presentation">
            <div
                className={styles.modal}
                role="dialog"
                aria-modal="true"
                onClick={(event) => event.stopPropagation()}
            >
                <button type="button" className={styles.close} onClick={onClose}>
                    ✕
                </button>
                {isLoading ? (
                    <p className={styles.state}>Завантаження...</p>
                ) : error ? (
                    <p className={styles.state}>Помилка: {error}</p>
                ) : item ? (
                    <div className={styles.content}>
                        {item.photo_url || item.photo || item.id ? (
                            <img
                                src={
                                    item.photo_url ??
                                    item.photo ??
                                    `${API_BASE_URL}/inventory/${item.id}/photo`
                                }
                                alt={item.inventory_name ?? 'Фото'}
                                className={styles.image}
                            />
                        ) : null}
                        <div>
                            <h2 className={styles.title}>
                                {item.inventory_name ?? 'Без назви'}
                            </h2>
                            <p className={styles.description}>
                                {item.description ?? 'Опис відсутній'}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className={styles.state}>Предмет не знайдено</p>
                )}
            </div>
        </div>
    )
}

export default InventoryQuickView
