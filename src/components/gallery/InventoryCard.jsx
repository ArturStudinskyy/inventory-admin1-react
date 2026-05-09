import { useFavorites } from '../../hooks/useFavorites'
import { API_BASE_URL } from '../../services/inventoryApi'
import styles from './InventoryCard.module.css'

function InventoryCard({ item, onOpen }) {
    const { toggleFavorite, isFavorite } = useFavorites()
    const imageUrl =
        item.photo_url ??
        item.photo ??
        (item.id ? `${API_BASE_URL}/inventory/${item.id}/photo` : null)
    const favorite = isFavorite(item.id)

    const handleToggle = (event) => {
        event.stopPropagation()
        toggleFavorite(item.id)
    }

    return (
        <article className={styles.card} onClick={() => onOpen?.(item.id)}>
            <div className={styles.imageWrapper}>
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={item.inventory_name ?? 'Фото інвентарю'}
                        className={styles.image}
                        loading="lazy"
                    />
                ) : (
                    <div className={styles.imagePlaceholder}>Без фото</div>
                )}
                <button
                    type="button"
                    className={favorite ? styles.heartActive : styles.heartButton}
                    aria-pressed={favorite}
                    aria-label={favorite ? 'Прибрати з улюблених' : 'Додати в улюблені'}
                    onClick={handleToggle}
                >
                    ❤
                </button>
            </div>
            <h3 className={styles.title}>{item.inventory_name ?? 'Без назви'}</h3>
            <p className={styles.description}>{item.description ?? 'Опис відсутній'}</p>
        </article>
    )
}

export default InventoryCard
