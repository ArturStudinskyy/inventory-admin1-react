import styles from './ConfirmModal.module.css'

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
        <div
            role="presentation"
            className={styles.backdrop}
            onClick={onCancel}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="confirm-modal-title"
                className={styles.modal}
                onClick={(event) => event.stopPropagation()}
            >
                <h2 className={styles.title} id="confirm-modal-title">
                    {title}
                </h2>
                <p className={styles.message}>{message}</p>
                <div className={styles.actions}>
                    <button
                        type="button"
                        className={styles.secondaryButton}
                        onClick={onCancel}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        type="button"
                        className={styles.primaryButton}
                        onClick={onConfirm}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal
