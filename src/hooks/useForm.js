import { useState } from "react";

export function useFormWithValidation(defaultValues, validationRules = {}) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  function validateField(name, value) {
    if (validationRules[name]) {
      return validationRules[name](value);
    }
    return null;
  }

  function validateAll(valuesToValidate) {
    const newErrors = {};
    let valid = true;

    Object.keys(validationRules).forEach((key) => {
      const error = validateField(key, valuesToValidate[key]);
      newErrors[key] = error;
      if (error) valid = false;
    });

    return { newErrors, valid };
  }

  function handleChange(evt) {
    const { name, value } = evt.target;

    setValues((prevValues) => {
      const updatedValues = { ...prevValues, [name]: value };
      const { newErrors, valid } = validateAll(updatedValues);
      setErrors(newErrors);
      setIsValid(valid);
      return updatedValues;
    });
  }

  function handleSubmit() {
    const { newErrors, valid } = validateAll(values);
    setErrors(newErrors);
    setIsValid(valid);
    return valid;
  }

  function resetForm() {
    setValues(defaultValues);
    setErrors({});
    setIsValid(false);
  }

  return { values, handleChange, handleSubmit, errors, isValid, resetForm };
}
