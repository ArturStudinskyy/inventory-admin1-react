import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InventoryDetails from '../components/inventory/InventoryDetails'
import { inventoryApi } from '../services/inventoryApi'

function AdminInventoryDetails() {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isActive = true

        setIsLoading(true)
        setError('')

        inventoryApi
            .getById(id)
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
    }, [id])

    if (isLoading) {
        return <div>Завантаження...</div>
    }

    if (error) {
        return <div>Помилка: {error}</div>
    }

    if (!item) {
        return <div>Предмет не знайдено</div>
    }

    return (
        <InventoryDetails item={item} />
    )
}

export default AdminInventoryDetails
