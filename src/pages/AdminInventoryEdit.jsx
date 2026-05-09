import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { inventoryApi } from '../services/inventoryApi'

const EMPTY_DETAILS = {
    inventoryName: '',
    description: '',
}

function validateDetails(values) {
    const errors = {}

    if (!values.inventoryName.trim()) {
        errors.inventoryName = 'Вкажіть назву'
    }

    if (!values.description.trim()) {
        errors.description = 'Вкажіть опис'
    }

    return errors
}

function validatePhoto(file) {
    if (!file) {
        return 'Оберіть фото'
    }

    if (!file.type.startsWith('image/')) {
        return 'Потрібен файл зображення'
    }

    return ''
}

function AdminInventoryEdit() {
    const { id } = useParams()
    const [details, setDetails] = useState(EMPTY_DETAILS)
    const [photoFile, setPhotoFile] = useState(null)
    const [photoUrl, setPhotoUrl] = useState('')
    const [detailsErrors, setDetailsErrors] = useState({})
    const [photoError, setPhotoError] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [loadError, setLoadError] = useState('')
    const [isSavingDetails, setIsSavingDetails] = useState(false)
    const [isSavingPhoto, setIsSavingPhoto] = useState(false)
    const [detailsSuccess, setDetailsSuccess] = useState('')
    const [photoSuccess, setPhotoSuccess] = useState('')

    useEffect(() => {
        let isActive = true

        setIsLoading(true)
        setLoadError('')

        inventoryApi
            .getById(id)
            .then((response) => {
                if (!isActive) {
                    return
                }

                const data = response.data ?? {}

                setDetails({
                    inventoryName: data.inventory_name ?? data.name ?? '',
                    description: data.description ?? '',
                })
                setPhotoUrl(data.photoUrl ?? data.photo_url ?? '')
            })
            .catch((error) => {
                if (!isActive) {
                    return
                }

                setLoadError(error?.message ?? 'Не вдалося завантажити предмет')
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

    const handleDetailsChange = (event) => {
        const { name, value } = event.target

        setDetails((current) => ({
            ...current,
            [name]: value,
        }))
    }

    const handleDetailsSubmit = async (event) => {
        event.preventDefault()

        const nextErrors = validateDetails(details)
        setDetailsErrors(nextErrors)
        setDetailsSuccess('')

        if (Object.keys(nextErrors).length > 0) {
            return
        }

        setIsSavingDetails(true)

        try {
            await inventoryApi.updateDetails(id, {
                inventory_name: details.inventoryName.trim(),
                description: details.description.trim(),
            })

            setDetailsSuccess('Зміни збережено')
        } catch (error) {
            setDetailsErrors({
                submit: error?.message ?? 'Не вдалося зберегти зміни',
            })
        } finally {
            setIsSavingDetails(false)
        }
    }

    const handlePhotoChange = (event) => {
        const file = event.target.files?.[0] ?? null

        setPhotoFile(file)
        setPhotoError('')
        setPhotoSuccess('')
    }

    const handlePhotoSubmit = async (event) => {
        event.preventDefault()

        const errorMessage = validatePhoto(photoFile)
        setPhotoError(errorMessage)
        setPhotoSuccess('')

        if (errorMessage) {
            return
        }

        setIsSavingPhoto(true)

        try {
            const formData = new FormData()
            formData.append('photo', photoFile)

            await inventoryApi.updatePhoto(id, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })

            setPhotoSuccess('Фото оновлено')
        } catch (error) {
            setPhotoError(error?.message ?? 'Не вдалося оновити фото')
        } finally {
            setIsSavingPhoto(false)
        }
    }

    if (isLoading) {
        return <div>Завантаження...</div>
    }

    if (loadError) {
        return <div>Помилка: {loadError}</div>
    }

    return (
        <section>
            <h1>Редагування інвентарю</h1>

            <form onSubmit={handleDetailsSubmit}>
                <h2>Текстові поля</h2>
                <div>
                    <label htmlFor="inventory-name">Назва</label>
                    <input
                        id="inventory-name"
                        name="inventoryName"
                        type="text"
                        value={details.inventoryName}
                        onChange={handleDetailsChange}
                        disabled={isSavingDetails}
                        aria-invalid={Boolean(detailsErrors.inventoryName)}
                        aria-describedby={
                            detailsErrors.inventoryName ? 'inventory-name-error' : undefined
                        }
                    />
                    {detailsErrors.inventoryName ? (
                        <div id="inventory-name-error">{detailsErrors.inventoryName}</div>
                    ) : null}
                </div>

                <div>
                    <label htmlFor="inventory-description">Опис</label>
                    <textarea
                        id="inventory-description"
                        name="description"
                        value={details.description}
                        onChange={handleDetailsChange}
                        disabled={isSavingDetails}
                        aria-invalid={Boolean(detailsErrors.description)}
                        aria-describedby={
                            detailsErrors.description
                                ? 'inventory-description-error'
                                : undefined
                        }
                    />
                    {detailsErrors.description ? (
                        <div id="inventory-description-error">
                            {detailsErrors.description}
                        </div>
                    ) : null}
                </div>

                {detailsErrors.submit ? <div>{detailsErrors.submit}</div> : null}
                {detailsSuccess ? <div>{detailsSuccess}</div> : null}

                <button type="submit" disabled={isSavingDetails}>
                    {isSavingDetails ? 'Збереження...' : 'Зберегти зміни'}
                </button>
            </form>

            <form onSubmit={handlePhotoSubmit} encType="multipart/form-data">
                <h2>Фото</h2>
                {photoUrl ? (
                    <img src={photoUrl} alt="Поточне фото" width="220" />
                ) : null}
                <div>
                    <label htmlFor="inventory-photo">Нове фото</label>
                    <input
                        id="inventory-photo"
                        name="photo"
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        disabled={isSavingPhoto}
                        aria-invalid={Boolean(photoError)}
                        aria-describedby={photoError ? 'inventory-photo-error' : undefined}
                    />
                    {photoError ? (
                        <div id="inventory-photo-error">{photoError}</div>
                    ) : null}
                </div>

                {photoSuccess ? <div>{photoSuccess}</div> : null}

                <button type="submit" disabled={isSavingPhoto}>
                    {isSavingPhoto ? 'Оновлення...' : 'Оновити фото'}
                </button>
            </form>
        </section>
    )
}

export default AdminInventoryEdit
