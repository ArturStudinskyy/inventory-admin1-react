import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import AdminInventory from './pages/AdminInventory'
import AdminInventoryCreate from './pages/AdminInventoryCreate'
import AdminInventoryDetails from './pages/AdminInventoryDetails'
import AdminInventoryEdit from './pages/AdminInventoryEdit'
import Favorites from './pages/Favorites'
import Gallery from './pages/Gallery'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Gallery />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/admin" element={<Navigate to="/admin/inventory" replace />} />
          <Route path="/admin/inventory" element={<AdminInventory />} />
          <Route path="/admin/inventory/new" element={<AdminInventoryCreate />} />
          <Route path="/admin/inventory/:id" element={<AdminInventoryDetails />} />
          <Route
            path="/admin/inventory/:id/edit"
            element={<AdminInventoryEdit />}
          />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
