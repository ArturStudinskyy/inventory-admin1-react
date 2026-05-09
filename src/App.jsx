import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryDetails from './pages/AdminInventoryDetails'
import AdminInventoryEdit from './pages/AdminInventoryEdit'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/inventory" replace />} />
        <Route path="/inventory" element={<AdminInventory />} />
        <Route path="/inventory/new" element={<AdminInventoryCreate />} />
        <Route path="/inventory/:id" element={<AdminInventoryDetails />} />
        <Route path="/inventory/:id/edit" element={<AdminInventoryEdit />} />
        <Route path="*" element={<Navigate to="/inventory" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
