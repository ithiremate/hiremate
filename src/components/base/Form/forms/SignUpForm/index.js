import { useDispatch } from "react-redux";
import { useState } from "react";

import FORM from "../../../../../utils/constants/form";
import { validateSignUp } from "../../../../../utils/validation";
import { createUserWithEmailAndPassword } from "../../../../../store/actions/sessionActions";

import Input from "../../../../shared/Input";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function SignUpForm() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(FORM.SIGN_UP);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = ({ value, valueKey }) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], errorMessage: "", value },
    }));
  };

  const handleSignUp = async (validData) => {
    setIsLoading(true);

    await dispatch(createUserWithEmailAndPassword(validData));

    setIsLoading(false);
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].errorMessage = errors[errorKey];
      }
    });

    setInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateSignUp({
      data: {
        email: inputs.email.value,
        password: inputs.password.value,
        passwordConfirm: inputs.passwordConfirm.value,
      },
      onSuccess: (validData) => handleSignUp(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {Object.entries(inputs).map(([inputKey, input]) => {
        const { label, placeholder, value, errorMessage, isRequired, secured } =
          input;

        return (
          <Input
            key={inputKey}
            label={label}
            placeholder={placeholder}
            value={value}
            valueKey={inputKey}
            name={inputKey}
            errorMessage={errorMessage}
            isRequired={isRequired}
            secured={secured}
            onChange={handleInputChange}
          />
        );
      })}

      <Button
        label="registration"
        type="submit"
        className={styles.button}
        isLoading={isLoading}
      />
    </form>
  );
}

export default SignUpForm;
