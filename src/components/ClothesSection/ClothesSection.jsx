import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import handleAddClick from "../App/App";

export default function ClothesSection({
  clothingItems,
  handleCardClick,
  onCardLike,
}) {
  return (
    <div className="clothes-section">
      <div className="clothes-section__row">
        <p className="clothes-section__text">Your items</p>
        <button
          type="button"
          className="clothes-section__add-button"
          onClick={handleAddClick}
        >
          {" "}
          + Add new{" "}
        </button>
      </div>
      <ul className="clothes-section__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
            />
          );
        })}
      </ul>
    </div>
  );
}
