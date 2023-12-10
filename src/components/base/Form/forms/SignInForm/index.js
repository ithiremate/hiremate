import { useDispatch } from "react-redux";
import { useState } from "react";

import FORM from "../../../../../utils/constants/form";
import { validateSignIn } from "../../../../../utils/validation";
import { signInWithEmailAndPassword } from "../../../../../store/actions/sessionActions";

import styles from "./index.module.scss";
import Input from "../../../../shared/Input";
import Button from "../../../../shared/Button";

function SignInForm() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(FORM.SIGN_IN);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = ({ value, valueKey }) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], errorMessage: "", value },
    }));
  };

  const handleSignIn = async (validData) => {
    setIsLoading(true);

    await dispatch(signInWithEmailAndPassword(validData));

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

    validateSignIn({
      data: { email: inputs.email.value, password: inputs.password.value },
      onSuccess: (validData) => handleSignIn(validData),
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
        label="Login"
        type="submit"
        className={styles.button}
        isLoading={isLoading}
      />
    </form>
  );
}

export default SignInForm;
