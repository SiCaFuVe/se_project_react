import { useFormWithValidation } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, onRegister, onClose }) => {
  const defaultValues = {
    name: "",
    avatar: "",
    email: "",
    password: "",
  };

  const validationRules = {
    name: (value) => {
      if (!value.trim()) return "Name is required";
      if (value.trim().length < 2) return "Name must be at least 2 characters";
      if (value.trim().length > 30)
        return "Name must be less than 30 characters";
      return null;
    },
    avatar: (value) => {
      if (!value.trim()) return "Avatar URL is required";
      try {
        new URL(value);
        return null;
      } catch {
        return "Please enter a valid URL";
      }
    },
    email: (value) => {
      if (!value.trim()) return "Email is required";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) return "Please enter a valid email";
      return null;
    },
    password: (value) => {
      if (!value.trim()) return "Password is required";
      if (value.length < 6) return "Password must be at least 6 characters";
      return null;
    },
  };

  const { values, handleChange, handleSubmit, errors, resetForm } =
    useFormWithValidation(defaultValues, validationRules);

  function handleSubmitForm(evt) {
    evt.preventDefault();
    if (!handleSubmit()) return;

    onRegister(values).then(() => {
      resetForm();
    });
  }

  return (
    <ModalWithForm
      title="Sign up"
      name="register"
      buttonText="Sign up"
      isOpen={isOpen}
      onClose={onClose}
      onAfterClose={resetForm}
      onSubmit={handleSubmitForm}
    >
      <label htmlFor="register-name" className="modal__label">
        Name
        <input
          type="text"
          className="modal__input"
          name="name"
          id="register-name"
          placeholder="Name"
          required
          minLength="2"
          maxLength="30"
          value={values.name}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.name}</span>
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL
        <input
          type="url"
          className="modal__input"
          name="avatar"
          id="register-avatar"
          placeholder="Avatar URL"
          required
          value={values.avatar}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.avatar}</span>
      </label>

      <label htmlFor="register-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          id="register-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          id="register-password"
          placeholder="Password"
          required
          value={values.password}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.password}</span>
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
