import { useState } from "react";
import { useDispatch } from "react-redux";

import FORM from "../../../../../utils/constants/form";
import useSearch from "../../../../../hooks/useSearch";
import { validateCustomerWizard } from "../../../../../utils/validation";
import { updateUserFieldInDb } from "../../../../../store/actions/userActions";

import Input from "../../../../shared/Input";
import SearchInput from "../../../../shared/SearchInput";
import Button from "../../../../shared/Button";

import styles from "./index.module.scss";

function CustomerWizardForm() {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(FORM.CUSTOMER_WIZARD);
  const [isLoading, setIsLoading] = useState(false);

  const { locations, searchHandlers, resetHandlers } = useSearch();

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
      [valueKey]: { ...prev[valueKey], errorMessage: "", value },
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
        updatedInputs[errorKey].errorMessage = "Please enter Company location";
      } else if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].errorMessage = errors[errorKey];
      }
    });

    setInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
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
    <form onSubmit={handleSubmit} className={styles.form}>
      {Object.entries(inputs).map(([inputKey, input]) => {
        const {
          type,
          label,
          placeholder,
          value,
          displayKey,
          errorMessage,
          isRequired,
          secured,
        } = input;

        if (type === FORM.FIELD_TYPES.LOCATION) {
          return (
            <SearchInput
              key={inputKey}
              label={label}
              placeholder={placeholder}
              value={value.display_name}
              valueKey={inputKey}
              displayKey={displayKey}
              name={inputKey}
              errorMessage={errorMessage}
              results={locations.results}
              isLoading={locations.isLoading}
              isRequired
              onChange={handleLocationChange}
              onChose={handleLocationChose}
            />
          );
        }

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
        label="Submit"
        type="submit"
        className={styles.button}
        isLoading={isLoading}
      />
    </form>
  );
}

export default CustomerWizardForm;
