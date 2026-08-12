import "./ModalWithForm.css";

function ModalWithForm({
  children,
  title,
  name,
  buttonText = "Save",
  isOpen,
  onClose,
  onSubmit,
  onAfterClose,
}) {
  function handleClose() {
    if (typeof onAfterClose === "function") onAfterClose();
    if (typeof onClose === "function") onClose();
  }

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title"> {title} </h2>
        <button
          onClick={handleClose}
          type="button"
          className="modal__close"
        ></button>
        <form className="modal__form" onSubmit={onSubmit} name={name}>
          {children}
          <button type="submit" className="button modal__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
