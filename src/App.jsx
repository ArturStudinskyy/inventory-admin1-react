import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

const InventoryListPage = () => <div>Inventory list</div>
const InventoryCreatePage = () => <div>Create inventory item</div>
const InventoryEditPage = () => <div>Edit inventory item</div>
const InventoryDetailsPage = () => <div>Inventory details</div>

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inventory" replace />} />
        <Route path="/inventory" element={<InventoryListPage />} />
        <Route path="/inventory/new" element={<InventoryCreatePage />} />
        <Route path="/inventory/:id" element={<InventoryDetailsPage />} />
        <Route path="/inventory/:id/edit" element={<InventoryEditPage />} />
        <Route path="*" element={<Navigate to="/inventory" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
