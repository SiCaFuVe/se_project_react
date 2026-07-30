import { useFormWithValidation } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ isOpen, onAddItem, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weatherType: "",
  };

  const validationRules = {
    name: (value) => {
      if (!value.trim()) return "Name is required";
      if (value.length > 30) return "Name must be less than 30 characters";
      return null;
    },
    imageUrl: (value) => {
      if (!value.trim()) return "Image URL is required";
      try {
        new URL(value);
        return null;
      } catch {
        return "Please enter a valid URL";
      }
    },
    weatherType: (value) => {
      if (!value) return "Please select a weather type";
      return null;
    },
  };

  const { values, handleChange, handleSubmit, errors, isValid, resetForm } =
    useFormWithValidation(defaultValues, validationRules);

  function handleSubmitForm(evt) {
    evt.preventDefault();
    if (!handleSubmit()) return;
    onAddItem(values).then(() => {
      resetForm();
    });
  }

  return (
    <ModalWithForm
      title="New garment"
      name="new-card"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >
      <label htmlFor="clothing-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input modal__input_type_card-name"
          name="name"
          id="clothing-name"
          placeholder="Name"
          required
          minLength="1"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error" id="place-name-error">
          {errors.name}
        </span>
      </label>
      <label htmlFor="clothing-imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input modal__input_type_url"
          id="clothing-imageUrl"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
        <span className="modal__error" id="image-url-error">
          {errors.imageUrl}
        </span>
      </label>
      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend"> Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="hot"
            onChange={handleChange}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="warm"
            onChange={handleChange}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            name="weatherType"
            className="modal__radio-input"
            value="cold"
            onChange={handleChange}
          />{" "}
          Cold
        </label>
        <span className="modal__error" id="weather-type-error">
          {errors.weatherType}
        </span>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
