import { useFormWithValidation } from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, onLogin, onClose }) => {
  const defaultValues = {
    email: "",
    password: "",
  };

  const validationRules = {
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

    onLogin(values).then(() => {
      resetForm();
    });
  }

  return (
    <ModalWithForm
      title="Log in"
      name="login"
      buttonText="Log in"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmitForm}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          type="email"
          className="modal__input"
          name="email"
          id="login-email"
          placeholder="Email"
          required
          value={values.email}
          onChange={handleChange}
        />
        <span className="modal__error">{errors.email}</span>
      </label>

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          type="password"
          className="modal__input"
          name="password"
          id="login-password"
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

export default LoginModal;
