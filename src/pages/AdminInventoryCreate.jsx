import { useNavigate } from 'react-router-dom'
import InventoryForm from '../components/inventory/InventoryForm'

function AdminInventoryCreate() {
    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate('/inventory')
    }

    return (
        <section>
            <h1>Додати інвентар</h1>
            <InventoryForm onSuccess={handleSuccess} submitLabel="Створити" />
        </section>
    )
}

export default AdminInventoryCreate
