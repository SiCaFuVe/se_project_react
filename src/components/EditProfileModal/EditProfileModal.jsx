import { useEffect, useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const EditProfileModal = ({
  isOpen,
  onClose,
  onUpdateProfile,
  currentUser,
}) => {
  const [values, setValues] = useState({
    name: "",
    avatar: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [currentUser, isOpen]);

  function resetToUser() {
    if (currentUser) {
      setValues({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    } else {
      setValues({ name: "", avatar: "" });
    }
    setErrors({});
  }

  const validateForm = (formValues) => {
    const nextErrors = {};

    if (!formValues.name.trim()) {
      nextErrors.name = "Name is required";
    } else if (formValues.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
    } else if (formValues.name.trim().length > 30) {
      nextErrors.name = "Name must be less than 30 characters";
    }

    if (!formValues.avatar.trim()) {
      nextErrors.avatar = "Avatar URL is required";
    } else {
      try {
        new URL(formValues.avatar);
      } catch {
        nextErrors.avatar = "Please enter a valid URL";
      }
    }

    return nextErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const nextValues = { ...values, [name]: value };

    setValues(nextValues);
    setErrors(validateForm(nextValues));
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    const nextErrors = validateForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onUpdateProfile(values).then(() => {
      onClose();
    });
  };

  return (
    <ModalWithForm
      title="Edit profile"
      name="edit-profile"
      buttonText="Save changes"
      isOpen={isOpen}
      onClose={onClose}
      onAfterClose={resetToUser}
      onSubmit={handleSubmitForm}
    >
      <label htmlFor="edit-profile-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="edit-profile-name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="edit-profile-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatar"
          id="edit-profile-avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
