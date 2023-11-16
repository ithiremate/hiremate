import { useState } from "react";
import { useDispatch } from "react-redux";

import { updateUserFieldInDb } from "../../../../../store/actions/userActions";
import { validateCustomerWizard } from "../../../../../utils/validation";

import Input from "../../../../shared/Input";
import LocationInput from "../../../../shared/LocationInput";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function CustomerForm() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    companyName: { value: "", errorMessage: "" },
    location: { value: { display_name: "" }, errorMessage: "" },
    username: { value: "", errorMessage: "" },
  });

  const updateCompanyInfo = async (validData) => {
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

  const handleLocationChange = ({ value }) => {
    setInputs((prev) => ({
      ...prev,
      location: { ...prev.location, value: { display_name: value } },
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

    validateCustomerWizard({
      data: {
        companyName: inputs.companyName.value,
        location: inputs.location.value,
        username: inputs.username.value,
      },
      onSuccess: (validData) => updateCompanyInfo(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <form onSubmit={handleSubmit()} className={styles.form}>
      <Input
        label="Company Name"
        placeholder="Enter Company name"
        value={inputs.companyName.value}
        valueKey="companyName"
        name="companyName"
        errorMessage={inputs.companyName.errorMessage}
        isRequired
        onChange={handleInputChange}
      />

      <LocationInput
        label="Company Location"
        placeholder="Enter Company location"
        value={inputs.location.value.display_name}
        valueKey="location"
        name="location"
        errorMessage={inputs.location.errorMessage}
        isRequired
        onChange={handleLocationChange}
        onChose={handleInputChange}
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

export default CustomerForm;
