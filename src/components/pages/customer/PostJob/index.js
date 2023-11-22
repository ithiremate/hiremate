import { useState } from "react";

import { validatePostJob } from "../../../../utils/validation";

import Input from "../../../shared/Input";
import LocationInput from "../../../shared/LocationInput";
import CustomRangeSlider from "../../../shared/CustomRangeSlider";
import Button from "../../../shared/Button";

import styles from "./index.module.scss";

function PostJob() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    jobTitle: { value: "", errorMessage: "" },
    jobLocation: { value: { display_name: "" }, errorMessage: "" },
    salary: { value: [0, 1000], errorMessage: "" },
  });

  const postJob = async (validData) => {
    console.log(validData);

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
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
      jobLocation: {
        ...prev.jobLocation,
        errorMessage: "",
        value: { display_name: value },
      },
    }));
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    console.log(errors);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey] && errorKey === "jobLocation") {
        updatedInputs[errorKey].errorMessage = "Please enter job location";
      } else if (updatedInputs[errorKey] && errorKey === "salary") {
        updatedInputs[errorKey].errorMessage =
          "Please provide positive integer";
      } else if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].errorMessage = errors[errorKey];
      }
    });

    setInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    validatePostJob({
      data: {
        jobTitle: inputs.jobTitle.value,
        jobLocation: inputs.jobLocation.value,
        salary: inputs.salary.value,
      },
      onSuccess: (validData) => postJob(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post new job</h1>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputs}>
            <Input
              label="Title"
              placeholder="Job Title"
              value={inputs.jobTitle.value}
              valueKey="jobTitle"
              name="jobTitle"
              errorMessage={inputs.jobTitle.errorMessage}
              isRequired
              onChange={handleInputChange}
            />

            <LocationInput
              label="Location"
              placeholder="Job Location"
              value={inputs.jobLocation.value.display_name}
              valueKey="jobLocation"
              name="jobLocation"
              errorMessage={inputs.jobLocation.errorMessage}
              isRequired
              onChange={handleLocationChange}
              onChose={handleInputChange}
            />

            <CustomRangeSlider
              label="Salary"
              value={inputs.salary.value}
              valueKey="salary"
              errorMessage={inputs.salary.errorMessage}
              min={0}
              max={50000}
              isRequired
              onChange={handleInputChange}
            />
          </div>

          <div className={styles.inputs}>
            <Button
              label="post job"
              type="submit"
              className={styles.button}
              isLoading={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;
