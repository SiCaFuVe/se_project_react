import "./Header.css";
import { useContext } from "react";
import { NavLink } from "react-router-dom";

import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import logo from "../../assets/logo.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClick,
  weatherData,
  onRegisterClick,
  onLoginClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const userInitial = currentUser?.name?.trim()?.charAt(0)?.toUpperCase() || "";

  return (
    <header className="header">
      <NavLink to="/" className="header__logo-link">
        <img className="header__logo" src={logo} alt="WTWR logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add Clothes
      </button>
      {isLoggedIn && currentUser ? (
        <NavLink to="/profile" className="header__nav-link">
          <div className="header__user-container">
            <p className="header__username">{currentUser.name}</p>
            {currentUser.avatar ? (
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="header__avatar"
              />
            ) : (
              <div className="header__avatar header__avatar-placeholder">
                {userInitial}
              </div>
            )}
          </div>
        </NavLink>
      ) : (
        <div className="header__auth-buttons">
          <button
            type="button"
            className="header__auth-btn"
            onClick={onRegisterClick}
          >
            Sign up
          </button>
          <button
            type="button"
            className="header__auth-btn"
            onClick={onLoginClick}
          >
            Log in
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
