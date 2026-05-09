import InventoryCard from './InventoryCard'
import styles from './InventoryGallery.module.css'

const SKELETON_COUNT = 8

function InventoryGallery({ items, isLoading = false, onCardClick }) {
    if (isLoading) {
        return (
            <div className={styles.grid}>
                {Array.from({ length: SKELETON_COUNT }).map((_, index) => (
                    <div key={index} className={styles.skeletonCard}>
                        <div className={styles.skeletonImage} />
                        <div className={styles.skeletonLine} />
                        <div className={styles.skeletonLineShort} />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div className={styles.grid}>
            {items.map((item) => (
                <InventoryCard key={item.id} item={item} onOpen={onCardClick} />
            ))}
        </div>
    )
}

export default InventoryGallery
