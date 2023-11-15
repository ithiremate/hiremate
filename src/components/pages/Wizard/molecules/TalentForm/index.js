import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserFieldInDb } from "../../../../../store/actions/userActions";
import { validateTalentWizard } from "../../../../../utils/validation";

import Input from "../../../../shared/Input";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function TalentForm() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    location: { value: "", errorMessage: "" },
    username: { value: "", errorMessage: "" },
  });

  const updateUserInfo = async (validData) => {
    setIsLoading(true);

    await dispatch(
      updateUserFieldInDb({ ...validData, wizardCompleted: true }),
    );

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

  const handleSubmit = () => (e) => {
    e.preventDefault();

    validateTalentWizard({
      data: {
        location: inputs.location.value,
        username: inputs.username.value,
      },
      onSuccess: (validData) => updateUserInfo(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <form onSubmit={handleSubmit()} className={styles.form}>
      <Input
        label="Location"
        placeholder="Enter location"
        value={inputs.location.value}
        valueKey="location"
        name="location"
        errorMessage={inputs.location.errorMessage}
        isRequired
        onChange={handleInputChange}
      />

      <Input
        label="Username"
        placeholder="Enter Username"
        value={inputs.username.value}
        valueKey="username"
        name="username"
        errorMessage={inputs.username.errorMessage}
        isRequired
        onChange={handleInputChange}
      />

      <Button
        label="Submit"
        type="submit"
        className={styles.button}
        isLoading={isLoading}
      />
    </form>
  );
}

export default TalentForm;
