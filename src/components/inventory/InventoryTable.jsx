function InventoryTable({ items }) {
    const rows = Array.isArray(items) ? items : []

    return (
        <table>
            <thead>
                <tr>
                    <th>Назва</th>
                    <th>Опис</th>
                    <th>Фото</th>
                </tr>
            </thead>
            <tbody>
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={3}>Немає даних</td>
                    </tr>
                ) : (
                    rows.map((item) => (
                        <tr key={item.id ?? item.name}>
                            <td>{item.name}</td>
                            <td>{item.description}</td>
                            <td>
                                {item.photoUrl ? (
                                    <img src={item.photoUrl} alt={item.name} width="80" />
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
