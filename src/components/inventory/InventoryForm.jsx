import { useState } from 'react'
import { inventoryApi } from '../../services/inventoryApi'

const DEFAULT_VALUES = {
    inventory_name: '',
    description: '',
    photo: null,
}

function validate(values) {
    const errors = {}

    if (!values.inventory_name.trim()) {
        errors.inventory_name = 'Вкажіть назву'
    }

    if (values.photo && !values.photo.type.startsWith('image/')) {
        errors.photo = 'Потрібен файл зображення'
    }

    return errors
}

function InventoryForm({ onSuccess, submitLabel = 'Додати' }) {
    const [values, setValues] = useState(DEFAULT_VALUES)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target

        setValues((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] ?? null

        setValues((current) => ({
            ...current,
            photo: file,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()

        const nextErrors = validate(values)
        setErrors(nextErrors)

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        setIsSubmitting(true)
        setSubmitError('')

        try {
            const formData = new FormData()
            formData.append('inventory_name', values.inventory_name.trim())
            formData.append('description', values.description.trim())

            if (values.photo) {
                formData.append('photo', values.photo)
            }

            const response = await inventoryApi.create(formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setValues(DEFAULT_VALUES)
            if (onSuccess) {
                onSuccess(response.data)
            }
        } catch (error) {
            setSubmitError(error?.message ?? 'Не вдалося створити предмет')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div>
                <label htmlFor="inventory-name">Назва</label>
                <input
                    id="inventory-name"
                    name="inventory_name"
                    type="text"
                    value={values.inventory_name}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.inventory_name)}
                    aria-describedby={
                        errors.inventory_name ? 'inventory-name-error' : undefined
                    }
                    disabled={isSubmitting}
                />
                {errors.inventory_name ? (
                    <div id="inventory-name-error">{errors.inventory_name}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="inventory-description">Опис</label>
                <textarea
                    id="inventory-description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.description)}
                    aria-describedby={
                        errors.description
                            ? 'inventory-description-error'
                            : undefined
                    }
                    disabled={isSubmitting}
                />
                {errors.description ? (
                    <div id="inventory-description-error">{errors.description}</div>
                ) : null}
            </div>

            <div>
                <label htmlFor="inventory-photo">Фото</label>
                <input
                    id="inventory-photo"
                    name="photo"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    aria-invalid={Boolean(errors.photo)}
                    aria-describedby={errors.photo ? 'inventory-photo-error' : undefined}
                    disabled={isSubmitting}
                />
                {errors.photo ? (
                    <div id="inventory-photo-error">{errors.photo}</div>
                ) : null}
            </div>

            {submitError ? <div>{submitError}</div> : null}

            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? 'Збереження...' : submitLabel}
            </button>
        </form>
    )
}

export default InventoryForm
