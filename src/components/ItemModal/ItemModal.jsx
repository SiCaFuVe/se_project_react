import { useContext } from "react";

import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  activeModal,
  onClose,
  card,
  onRequestDelete,
  isLoggedIn,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;
  const itemDeleteButtonClassName = `modal__delete ${
    isOwn && isLoggedIn ? "" : "modal__delete_hidden"
  }`;

  const handleDeleteClick = () => {
    onRequestDelete();
  };

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__content modal__content_type_image">
        <button
          onClick={onClose}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__info">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
          </div>
          <button
            type="button"
            onClick={handleDeleteClick}
            className={itemDeleteButtonClassName}
          >
            Delete item
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
