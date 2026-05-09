import { useEffect, useState } from 'react'
import FavoritesBar from '../components/gallery/FavoritesBar'
import InventoryGallery from '../components/gallery/InventoryGallery'
import InventoryQuickView from '../components/gallery/InventoryQuickView'
import { inventoryApi } from '../services/inventoryApi'
import styles from './Gallery.module.css'

function Gallery() {
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        let isActive = true

        setIsLoading(true)
        setError('')

        inventoryApi
            .getAll()
            .then((response) => {
                if (!isActive) {
                    return
                }

                const data = response.data
                const list = Array.isArray(data) ? data : data?.items ?? data?.data ?? []
                setItems(list)
            })
            .catch((err) => {
                if (!isActive) {
                    return
                }

                setError(err?.message ?? 'Не вдалося завантажити інвентар')
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
    }, [])

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <div>
                    <p className={styles.badge}>Користувацька галерея</p>
                    <h1 className={styles.title}>Інвентар</h1>
                </div>
                <p className={styles.subtitle}>Перегляньте доступні позиції складу</p>
            </div>

            <FavoritesBar />

            {error ? <div className={styles.error}>Помилка: {error}</div> : null}

            <InventoryGallery
                items={items}
                isLoading={isLoading}
                onCardClick={(id) => setSelectedId(id)}
            />

            <InventoryQuickView
                itemId={selectedId}
                isOpen={Boolean(selectedId)}
                onClose={() => setSelectedId(null)}
            />
        </section>
    )
}

export default Gallery
