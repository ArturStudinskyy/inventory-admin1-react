import { useNavigate } from 'react-router-dom'
import InventoryForm from '../components/inventory/InventoryForm'
import styles from './AdminInventoryCreate.module.css'

function AdminInventoryCreate() {
    const navigate = useNavigate()

    const handleSuccess = () => {
        navigate('/inventory')
    }

    return (
        <section className={styles.page}>
            <h1 className={styles.title}>Додати інвентар</h1>
            <InventoryForm onSuccess={handleSuccess} submitLabel="Створити" />
        </section>
    )
}

export default AdminInventoryCreate
