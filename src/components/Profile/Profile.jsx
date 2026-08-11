import { useContext } from "react";

import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function Profile({
  handleAddClick,
  clothingItems,
  handleCardClick,
  onCardLike,
  onEditProfileClick,
  onSignOut,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id,
  );

  return (
    <section className="profile">
      <SideBar onEditProfileClick={onEditProfileClick} onSignOut={onSignOut} />
      <ClothesSection
        handleCardClick={handleCardClick}
        clothingItems={userClothingItems}
        onCardLike={onCardLike}
        onClickAdd={handleAddClick}
      />
    </section>
  );
}
