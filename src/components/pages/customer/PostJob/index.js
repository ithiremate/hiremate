import { useState } from "react";

import POST_JOB from "../../../../utils/constants/postJob";
import { validatePostJob } from "../../../../utils/validation";

import Input from "../../../shared/Input";
import SearchInput from "../../../shared/SearchInput";
import InputGroup from "../../../shared/InputGroup";
import CheckboxGroup from "../../../shared/CheckboxGroup";
import TextArea from "../../../shared/TextArea";
import Button from "../../../shared/Button";

import styles from "./index.module.scss";

function PostJob() {
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    jobTitle: { value: "", errorMessage: "" },
    jobLocation: { value: { display_name: "" }, errorMessage: "" },
    salaryFrom: { value: "", errorMessage: "" },
    salaryTo: { value: "", errorMessage: "" },
    employmentType: {
      [POST_JOB.EMPLOYMENT_TYPES.FULL_TIME]: false,
      [POST_JOB.EMPLOYMENT_TYPES.PART_TIME]: false,
      [POST_JOB.EMPLOYMENT_TYPES.PROJECT]: false,
      errorMessage: "",
    },
    workNature: {
      [POST_JOB.WORK_NATURE_TYPES.ON_SITE]: false,
      [POST_JOB.WORK_NATURE_TYPES.REMOTE]: false,
      [POST_JOB.WORK_NATURE_TYPES.HYBRID]: false,
      errorMessage: "",
    },
    jobDescription: { value: "", errorMessage: "" },
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

  const handleCheckboxChange =
    (objectKey) =>
    ({ value, valueKey }) => {
      setInputs((prev) => ({
        ...prev,
        [objectKey]: {
          ...prev[objectKey],
          [valueKey]: value,
          errorMessage: "",
        },
      }));
    };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey] && errorKey === "jobLocation") {
        updatedInputs[errorKey].errorMessage = "Please enter job location";
      } else if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].errorMessage = errors[errorKey];
      }
    });

    setInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employmentType = [];
    const workNature = [];

    Object.values(POST_JOB.EMPLOYMENT_TYPES).forEach((type) => {
      if (inputs.employmentType[type]) {
        employmentType.push(type);
      }
    });

    Object.values(POST_JOB.WORK_NATURE_TYPES).forEach((type) => {
      if (inputs.workNature[type]) {
        workNature.push(type);
      }
    });

    validatePostJob({
      data: {
        jobTitle: inputs.jobTitle.value,
        jobDescription: inputs.jobDescription.value,
        jobLocation: inputs.jobLocation.value,
        salaryFrom: inputs.salaryFrom.value,
        salaryTo: inputs.salaryTo.value,
        employmentType,
        workNature,
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

            <SearchInput
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

            <InputGroup
              addon="to"
              label="Salary"
              onChange={handleInputChange}
              isRequired
              inputs={[
                {
                  placeholder: "Salary from",
                  value: inputs.salaryFrom.value,
                  valueKey: "salaryFrom",
                  errorMessage: inputs.salaryFrom.errorMessage,
                  name: "salaryFrom",
                  type: "number",
                },
                {
                  placeholder: "Salary to",
                  value: inputs.salaryTo.value,
                  valueKey: "salaryTo",
                  errorMessage: inputs.salaryTo.errorMessage,
                  name: "salaryTo",
                  type: "number",
                },
              ]}
            />

            <div className={styles.doubleRows}>
              <CheckboxGroup
                label="Type of employment"
                isError={!!inputs.employmentType.errorMessage}
                errorMessage={inputs.employmentType.errorMessage}
                onChange={handleCheckboxChange("employmentType")}
                inputs={[
                  {
                    label: "Full-time",
                    isChecked:
                      inputs.employmentType[
                        POST_JOB.EMPLOYMENT_TYPES.FULL_TIME
                      ],
                    valueKey: POST_JOB.EMPLOYMENT_TYPES.FULL_TIME,
                  },
                  {
                    label: "Part-time",
                    isChecked:
                      inputs.employmentType[
                        POST_JOB.EMPLOYMENT_TYPES.PART_TIME
                      ],
                    valueKey: POST_JOB.EMPLOYMENT_TYPES.PART_TIME,
                  },
                  {
                    label: "Project",
                    isChecked:
                      inputs.employmentType[POST_JOB.EMPLOYMENT_TYPES.PROJECT],
                    valueKey: POST_JOB.EMPLOYMENT_TYPES.PROJECT,
                  },
                ]}
                isRequired
              />

              <CheckboxGroup
                label="Nature of work"
                isError={!!inputs.workNature.errorMessage}
                errorMessage={inputs.workNature.errorMessage}
                onChange={handleCheckboxChange("workNature")}
                inputs={[
                  {
                    label: "On-site",
                    isChecked:
                      inputs.workNature[POST_JOB.WORK_NATURE_TYPES.ON_SITE],
                    valueKey: POST_JOB.WORK_NATURE_TYPES.ON_SITE,
                  },
                  {
                    label: "Remote",
                    isChecked:
                      inputs.workNature[POST_JOB.WORK_NATURE_TYPES.REMOTE],
                    valueKey: POST_JOB.WORK_NATURE_TYPES.REMOTE,
                  },
                  {
                    label: "Hybrid",
                    isChecked:
                      inputs.workNature[POST_JOB.WORK_NATURE_TYPES.HYBRID],
                    valueKey: POST_JOB.WORK_NATURE_TYPES.HYBRID,
                  },
                ]}
                isRequired
              />
            </div>

            <TextArea
              label="Description"
              placeholder="Job Description"
              value={inputs.jobDescription.value}
              valueKey="jobDescription"
              errorMessage={inputs.jobDescription.errorMessage}
              onChange={handleInputChange}
              isRequired
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
