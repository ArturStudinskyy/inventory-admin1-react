import { useEffect, useMemo, useState } from 'react'
import FavoritesBar from '../components/gallery/FavoritesBar'
import InventoryGallery from '../components/gallery/InventoryGallery'
import InventoryQuickView from '../components/gallery/InventoryQuickView'
import { useFavorites } from '../hooks/useFavorites'
import { inventoryApi } from '../services/inventoryApi'
import styles from './Favorites.module.css'

function Favorites() {
    const { favorites } = useFavorites()
    const [items, setItems] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [selectedId, setSelectedId] = useState(null)

    useEffect(() => {
        let isActive = true

        if (favorites.length === 0) {
            setItems([])
            setIsLoading(false)
            return () => {
                isActive = false
            }
        }

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
    }, [favorites])

    const favoriteItems = useMemo(() => {
        const favoriteIds = new Set(favorites.map(String))
        return items.filter((item) => favoriteIds.has(String(item.id)))
    }, [favorites, items])

    return (
        <section className={styles.page}>
            <div className={styles.header}>
                <div>
                    <p className={styles.badge}>Улюблені товари</p>
                    <h1 className={styles.title}>Обрані позиції</h1>
                </div>
                <p className={styles.subtitle}>Збережені товари для швидкого доступу</p>
            </div>

            <FavoritesBar showLink={false} />

            {favorites.length === 0 ? (
                <div className={styles.empty}>У вас ще немає улюблених товарів</div>
            ) : error ? (
                <div className={styles.error}>Помилка: {error}</div>
            ) : (
                <InventoryGallery
                    items={favoriteItems}
                    isLoading={isLoading}
                    onCardClick={(id) => setSelectedId(id)}
                />
            )}

            <InventoryQuickView
                itemId={selectedId}
                isOpen={Boolean(selectedId)}
                onClose={() => setSelectedId(null)}
            />
        </section>
    )
}

export default Favorites
