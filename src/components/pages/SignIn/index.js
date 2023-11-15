import { useDispatch } from "react-redux";
import { useState } from "react";

import { validateSignIn } from "../../../utils/validation";
import { signInWithEmailAndPassword } from "../../../store/actions/sessionActions";

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
  });

  const handleSignIn = async (validData) => {
    setIsLoading(true);
    await dispatch(signInWithEmailAndPassword(validData));
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

    validateSignIn({
      data: { email: inputs.email.value, password: inputs.password.value },
      onSuccess: (validData) => handleSignIn(validData),
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

        <Button
          label="Login"
          type="submit"
          className={styles.button}
          isLoading={isLoading}
        />
      </form>

      <p className={styles.navigateText}>
        Haven&#39;t an account yet?{" "}
        <CustomLink label="Register" to="/sign-up" />
      </p>
    </div>
  );
}

export default SignIn;
