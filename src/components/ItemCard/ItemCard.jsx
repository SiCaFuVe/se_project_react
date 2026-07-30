import { useContext } from "react";

import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemCard({ item, onCardClick, onCardLike }) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const isLiked = item.likes?.some((id) => id === currentUser?._id) || false;
  const itemLikeButtonClassName = `card__like-button ${
    isLiked ? "card__like-button_active" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked: !isLiked });
  };

  return (
    <li className="card">
      <h2 className="card__name"> {item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
      {isLoggedIn ? (
        <button
          type="button"
          className={itemLikeButtonClassName}
          onClick={handleLike}
        >
          {isLiked ? "♥" : "♡"}
        </button>
      ) : null}
    </li>
  );
}

export default ItemCard;
