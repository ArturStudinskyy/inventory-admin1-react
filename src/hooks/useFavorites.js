import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'inventoryFavorites'

function readFavorites() {
    if (typeof window === 'undefined') {
        return []
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY)
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed.map(String) : []
    } catch {
        return []
    }
}

export function useFavorites() {
    const [favorites, setFavorites] = useState(() => readFavorites())

    useEffect(() => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = useCallback((id) => {
        const idValue = String(id)

        setFavorites((current) => {
            if (current.includes(idValue)) {
                return current.filter((item) => item !== idValue)
            }

            return [...current, idValue]
        })
    }, [])

    const isFavorite = useCallback(
        (id) => {
            const idValue = String(id)
            return favorites.includes(idValue)
        },
        [favorites]
    )

    return { favorites, toggleFavorite, isFavorite }
}
