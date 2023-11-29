import { useState } from "react";
import { useDispatch } from "react-redux";

import useSearch from "../../../../../hooks/useSearch";
import { validateTalentWizard } from "../../../../../utils/validation";
import { updateUserFieldInDb } from "../../../../../store/actions/userActions";

import Input from "../../../../shared/Input";
import SearchInput from "../../../../shared/SearchInput";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function CustomerForm() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    location: { value: { display_name: "" }, errorMessage: "" },
    username: { value: "", errorMessage: "" },
  });

  const { locations, searchHandlers, resetHandlers } = useSearch();

  const updateTalentInfo = async (validData) => {
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
      location: {
        ...prev.location,
        errorMessage: "",
        value: { display_name: value },
      },
    }));

    searchHandlers.locationSearch(value);
  };

  const handleLocationChose = ({ value, valueKey }) => {
    handleInputChange({ value, valueKey });
    resetHandlers.locationReset();
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey] && errorKey === "location") {
        updatedInputs[errorKey].errorMessage = "Please enter your location";
      } else if (updatedInputs[errorKey]) {
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
      onSuccess: (validData) => updateTalentInfo(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <form onSubmit={handleSubmit()} className={styles.form}>
      <SearchInput
        label="Location"
        placeholder="Enter location"
        value={inputs.location.value.display_name}
        valueKey="location"
        displayKey="display_name"
        errorMessage={inputs.location.errorMessage}
        results={locations.results}
        isLoading={locations.isLoading}
        isRequired
        onChange={handleLocationChange}
        onChose={handleLocationChose}
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
