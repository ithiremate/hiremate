import { useDispatch } from "react-redux";
import { useState } from "react";

import { validateSignUp } from "../../../utils/validation";
import { createUserWithEmailAndPassword } from "../../../store/actions/sessionActions";

import Input from "../../shared/Input";
import Button from "../../shared/Button";
import CustomLink from "../../shared/CustomLink";

import styles from "./index.module.scss";

function SignIn() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: { value: "", errorMessage: "" },
    password: { value: "", errorMessage: "" },
    passwordConfirm: { value: "", errorMessage: "" },
  });

  const handleSignUp = async (validData) => {
    setIsLoading(true);
    await dispatch(createUserWithEmailAndPassword(validData));
    setIsLoading(false);
  };

  const handleInputChange = ({ value, valueKey }) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { errorMessage: "", value },
    }));
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
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          placeholder="Email"
          value={inputs.email.value}
          valueKey="email"
          name="email"
          errorMessage={inputs.email.errorMessage}
          isRequired
          onChange={handleInputChange}
        />

        <Input
          label="Password"
          placeholder="Password"
          value={inputs.password.value}
          valueKey="password"
          name="password"
          errorMessage={inputs.password.errorMessage}
          isRequired
          secured
          onChange={handleInputChange}
        />

        <Input
          label="Confirm password"
          placeholder="Confirm password"
          value={inputs.passwordConfirm.value}
          valueKey="passwordConfirm"
          name="passwordConfirm"
          errorMessage={inputs.passwordConfirm.errorMessage}
          isRequired
          secured
          onChange={handleInputChange}
        />

        <Button
          label="registration"
          type="submit"
          className={styles.button}
          isLoading={isLoading}
        />
      </form>

      <p className={styles.navigateText}>
        Have an account? <CustomLink label="Sign In" to="/sign-in" />
      </p>
    </div>
  );
}

export default SignIn;
