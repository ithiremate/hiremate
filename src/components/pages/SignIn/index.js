import { useState } from "react";

import validateCreateSession from "../../../utils/validation";

import Input from "../../shared/Input";
import Button from "../../shared/Button";

import styles from "./index.module.scss";

function SignIn() {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    password: { value: "", isValid: true },
  });

  const handleInputChange = ({ value, valueKey }) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { isValid: true, value },
    }));
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].isValid = !errors[errorKey];
      }
    });

    setInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validateCreateSession({
      data: { email: inputs.email.value, password: inputs.password.value },
      onSuccess: (validData) => console.log(validData),
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
          isValid={inputs.email.isValid}
          isRequired
          onChange={handleInputChange}
        />

        <Input
          label="Password"
          placeholder="Password"
          value={inputs.password.value}
          valueKey="password"
          name="password"
          isValid={inputs.password.isValid}
          isRequired
          onChange={handleInputChange}
        />

        <Button label="Login" type="submit" className={styles.button} />
      </form>
    </div>
  );
}

export default SignIn;
