import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function formatValue(value) {
    if (value === null || value === undefined) {
        return '-'
    }

    if (typeof value === 'object') {
        return JSON.stringify(value)
    }

    return String(value)
}

function AdminInventoryDetails() {
    const { id } = useParams()
    const [item, setItem] = useState(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let isActive = true

        setIsLoading(true)
        setError('')

        axios
            .get(`/inventory/${id}`)
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

    const extraFields = Object.entries(item).filter(
        ([key]) => !['name', 'description', 'photoUrl'].includes(key)
    )

    return (
        <section>
            <h1>{item.name ?? 'Без назви'}</h1>
            {item.photoUrl ? (
                <img src={item.photoUrl} alt={item.name ?? 'Фото'} width="220" />
            ) : null}
            <p>{item.description ?? 'Опис відсутній'}</p>

            <div>
                <h2>Деталі</h2>
                {extraFields.length === 0 ? (
                    <p>Немає додаткових полів</p>
                ) : (
                    <dl>
                        {extraFields.map(([key, value]) => (
                            <div key={key}>
                                <dt>{key}</dt>
                                <dd>{formatValue(value)}</dd>
                            </div>
                        ))}
                    </dl>
                )}
            </div>
        </section>
    )
}

export default AdminInventoryDetails
