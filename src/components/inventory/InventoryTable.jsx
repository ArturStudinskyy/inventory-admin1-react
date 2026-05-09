import styles from './InventoryTable.module.css'

function InventoryTable({
    items,
    isLoading = false,
    error = '',
    renderActions,
}) {
    const rows = Array.isArray(items) ? items : []
    const showEmptyState = !isLoading && !error && rows.length === 0

    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th className={styles.headerCell}>Назва</th>
                    <th className={styles.headerCell}>Опис</th>
                    <th className={styles.headerCell}>Фото</th>
                    <th className={styles.headerCell}>Дії</th>
                </tr>
            </thead>
            <tbody>
                {isLoading ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={4}>
                            Завантаження...
                        </td>
                    </tr>
                ) : error ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={4}>
                            Помилка: {error}
                        </td>
                    </tr>
                ) : showEmptyState ? (
                    <tr>
                        <td className={styles.statusCell} colSpan={4}>
                            Немає даних
                        </td>
                    </tr>
                ) : (
                    rows.map((item) => (
                        <tr key={item.id ?? item.inventory_name}>
                            <td className={styles.cell}>{item.inventory_name}</td>
                            <td className={styles.cell}>{item.description}</td>
                            <td className={styles.cell}>
                                {item.photo_url ? (
                                    <img
                                        src={item.photo_url}
                                        alt={item.inventory_name}
                                        className={styles.photo}
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td className={styles.cell}>
                                <div className={styles.actions}>
                                    {renderActions ? renderActions(item) : null}
                                </div>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}

export default InventoryTable
