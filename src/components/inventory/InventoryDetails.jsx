import styles from './InventoryDetails.module.css'

function InventoryDetails({ item }) {
    if (!item) {
        return null
    }

    return (
        <section className={styles.wrapper}>
            <h1 className={styles.title}>{item.inventory_name ?? 'Без назви'}</h1>
            {item.photo_url || item.photo ? (
                <img
                    src={item.photo_url ?? item.photo}
                    alt={item.inventory_name ?? 'Фото'}
                    className={styles.photo}
                />
            ) : null}
            <p className={styles.description}>
                {item.description ?? 'Опис відсутній'}
            </p>
        </section>
    )
}

export default InventoryDetails
