import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Profile from "../Profile/Profile";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import ItemModal from "../ItemModal/ItemModal";
import ConfirmationModal from "../ConfirmationModal/ConfirmationModal";
import { filterWeatherData, getWeather } from "../../utils/weatherApi";
import currentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { signUp, signIn, getCurrentUser } from "../../utils/auth";
import {
  handleServerResponse,
  getItems,
  addItem,
  removeItem,
  updateCurrentUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";

function App() {
  const getStoredToken = () => localStorage.getItem("jwt") || "";

  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [token, setToken] = useState(localStorage.getItem("jwt") || "");
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(token));

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    if (!isLoggedIn) {
      setActiveModal("login");
      return;
    }

    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setActiveModal("edit-profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("jwt");
    setToken("");
    setIsLoggedIn(false);
    setCurrentUser(null);
    closeAllModals();
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleRequestDelete = () => {
    setActiveModal("confirm-delete");
  };

  const handleCancelDelete = () => {
    setActiveModal("preview");
  };

  const onAddItem = (inputValues) => {
    const newCardData = {
      name: inputValues.name,
      imageUrl: inputValues.imageUrl,
      weather: inputValues.weatherType,
    };

    return addItem(newCardData, token)
      .then((data) => {
        const newItem = data.data || data;
        setClothingItems((previewItems) => [newItem, ...previewItems]);
        closeAllModals();
      })
      .catch(console.error);
  };

  const onUpdateProfile = (inputValues) => {
    return updateCurrentUser(inputValues, token)
      .then((data) => {
        setCurrentUser(data.data);
        closeAllModals();
      })
      .catch(console.error);
  };

  const closeAllModals = () => {
    setActiveModal("");
  };

  const onRegister = (inputValues) => {
    const { email, password } = inputValues;

    return signUp(inputValues)
      .then(() => signIn({ email, password }))
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setToken(data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token).then((userData) => {
          setCurrentUser(userData.data);
          closeAllModals();
        });
      })
      .catch(console.error);
  };

  const onLogin = (inputValues) => {
    return signIn(inputValues)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setToken(res.token);
          setIsLoggedIn(true);
        }

        return getCurrentUser(res.token).then((userData) => {
          setCurrentUser(userData.data);
          closeAllModals();
        });
      })
      .catch(console.error);
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        const items = data.data || data;
        setClothingItems([...items].reverse());
      })
      .catch(console.error);

    const storedToken = localStorage.getItem("jwt");

    if (storedToken) {
      getCurrentUser(storedToken)
        .then((userData) => {
          setToken(storedToken);
          setIsLoggedIn(true);
          setCurrentUser(userData.data);
        })
        .catch(() => {
          localStorage.removeItem("jwt");
          setToken("");
          setIsLoggedIn(false);
          setCurrentUser(null);
        });
    }
  }, []);

  const handleCardLike = ({ id, isLiked }) => {
    const currentToken = localStorage.getItem("jwt");

    if (!currentToken) {
      return Promise.resolve();
    }

    const request = isLiked
      ? removeCardLike(id, currentToken)
      : addCardLike(id, currentToken);

    return request
      .then((updatedCardData) => {
        const updatedCard = updatedCardData.data || updatedCardData;

        setClothingItems((cards) =>
          cards.map((item) => (item._id === id ? updatedCard : item)),
        );
      })
      .catch(console.error);
  };

  const handleDeleteItem = (id) => {
    removeItem(id, token)
      .then(() => {
        setClothingItems((items) => items.filter((item) => item._id !== id));
        closeAllModals();
      })
      .catch(console.error);
  };

  return (
    <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
      <currentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              weatherData={weatherData}
              onRegisterClick={handleRegisterClick}
              onLoginClick={handleLoginClick}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      onCardLike={handleCardLike}
                      onEditProfileClick={handleEditProfileClick}
                      onSignOut={handleSignOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
          </div>
          <RegisterModal
            onClose={closeAllModals}
            isOpen={activeModal === "register"}
            onRegister={onRegister}
          />
          <LoginModal
            onClose={closeAllModals}
            isOpen={activeModal === "login"}
            onLogin={onLogin}
          />
          <AddItemModal
            onClose={closeAllModals}
            isOpen={activeModal === "add-garment"}
            onAddItem={onAddItem}
          />
          <EditProfileModal
            onClose={closeAllModals}
            isOpen={activeModal === "edit-profile"}
            onUpdateProfile={onUpdateProfile}
            currentUser={currentUser}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeAllModals}
            onRequestDelete={handleRequestDelete}
            isLoggedIn={isLoggedIn}
          />
          <ConfirmationModal
            isOpen={activeModal === "confirm-delete"}
            card={selectedCard}
            onConfirm={() => handleDeleteItem(selectedCard._id)}
            onCancel={handleCancelDelete}
          />
        </div>
      </currentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;
