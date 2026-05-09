import { createContext, useMemo, useState } from 'react'

export const InventoryContext = createContext({
    items: [],
    setItems: () => undefined,
})

export function InventoryProvider({ children }) {
    const [items, setItems] = useState([])

    const value = useMemo(() => ({ items, setItems }), [items])

    return (
        <InventoryContext.Provider value={value}>
            {children}
        </InventoryContext.Provider>
    )
}
