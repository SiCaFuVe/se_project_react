import "./ConfirmationModal.css";

function ConfirmationModal({ isOpen, card, onConfirm, onCancel }) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content confirmation-modal__content">
        <button
          onClick={onCancel}
          type="button"
          className="modal__close"
        ></button>

        <p className="confirmation-modal__message">
          Are you sure you want to delete <strong>{card.name}</strong>?
        </p>
        <div className="confirmation-modal__actions">
          <button
            type="button"
            className="confirmation-modal__button confirmation-modal__button_type_confirm"
            onClick={onConfirm}
          >
            Yes, delete item
          </button>
          <button
            type="button"
            className="confirmation-modal__button confirmation-modal__button_type_cancel"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationModal;
