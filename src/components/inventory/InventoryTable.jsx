import styles from './InventoryTable.module.css'

function InventoryTable({ items, isLoading = false, error = '' }) {
    const rows = Array.isArray(items) ? items : []
    const showEmptyState = !isLoading && !error && rows.length === 0

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.headerCell}>Назва</th>
                    <th className={styles.headerCell}>Опис</th>
                    <th className={styles.headerCell}>Фото</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={3}>
                            Завантаження...
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={3}>
                            Помилка: {error}
                        </td>
                    </tr>
                ) : showEmptyState ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={3}>
                            Немає даних
                        </td>
                    </tr>
                ) : (
                    rows.map((item) => (
                        <tr key={item.id ?? item.name}>
                            <td className={styles.cell}>{item.name}</td>
                            <td className={styles.cell}>{item.description}</td>
                            <td className={styles.cell}>
                                {item.photoUrl ? (
                                    <img
                                        src={item.photoUrl}
                                        alt={item.name}
                                        className={styles.photo}
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default InventoryTable
