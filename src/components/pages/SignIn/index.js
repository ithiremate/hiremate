import { useState } from "react";
import Button from "../../shared/Button";

import Input from "../../shared/Input";

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

  const handleSubmit = (e) => {
    e.preventDefault();
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
          onChange={handleInputChange}
        />

        <Input
          label="Password"
          placeholder="Password"
          value={inputs.password.value}
          valueKey="password"
          name="password"
          isValid={inputs.password.isValid}
          onChange={handleInputChange}
        />

        <Button label="Login" type="submit" className={styles.button} />
      </form>
    </div>
  );
}

export default SignIn;
