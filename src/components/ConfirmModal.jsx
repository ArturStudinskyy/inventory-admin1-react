function ConfirmModal({
    isOpen,
    title = 'Підтвердження',
    message = 'Ви впевнені, що хочете видалити цей елемент?',
    confirmLabel = 'Видалити',
    cancelLabel = 'Скасувати',
    onConfirm,
    onCancel,
}) {
    if (!isOpen) {
        return null
    }

    return (
        <div role="presentation" className="modal-backdrop" onClick={onCancel}>
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                className="modal"
                onClick={(event) => event.stopPropagation()}
            >
                <h2 id="confirm-modal-title">{title}</h2>
                <p>{message}</p>
                <div className="modal-actions">
                    <button type="button" onClick={onCancel}>
                        {cancelLabel}
                    </button>
                    <button type="button" onClick={onConfirm}>
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
