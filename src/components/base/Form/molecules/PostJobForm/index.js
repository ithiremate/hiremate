import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import POST_JOB from "../../../../../utils/constants/postJob";
import { validatePostJob } from "../../../../../utils/validation";
import useSearch from "../../../../../hooks/useSearch";
import { postNewJob } from "../../../../../store/actions/jobsActions";

import Button from "../../../../shared/Button";
import CheckboxGroup from "../../../../shared/CheckboxGroup";
import Input from "../../../../shared/Input";
import InputGroup from "../../../../shared/InputGroup";
import SearchInput from "../../../../shared/SearchInput";
import TextArea from "../../../../shared/TextArea";

import styles from "./index.module.scss";

function PostJobForm() {
  const dispatch = useDispatch();
  const { dbUser } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(POST_JOB.DEFAULT_FORM_FIELDS);

  const { locations, skills, searchHandlers, resetHandlers } = useSearch();

  const resetFields = () => setInputs(POST_JOB.DEFAULT_FORM_FIELDS);

  const postJob = async (validData) => {
    setIsLoading(true);

    await dispatch(
      postNewJob({ ...validData, companyName: dbUser.companyName }),
    );

    resetFields();
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

  const handleSkillsChange = ({ value }) => {
    setInputs((prev) => ({
      ...prev,
      skills: {
        ...prev.skills,
        errorMessage: "",
        value: { name: value },
      },
    }));

    searchHandlers.skillsSearch(value);
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

  const handleLocationChose = ({ value, valueKey }) => {
    handleInputChange({ value, valueKey });
    resetHandlers.locationReset();
  };

  const handleSkillsChose = ({ items, valueKey }) => {
    setInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], errorMessage: "", chosen: items },
    }));
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(inputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey] && errorKey === "location") {
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
        title: inputs.title.value,
        description: inputs.description.value,
        skills: inputs.skills.chosen,
        location: inputs.location.value,
        salaryFrom: inputs.salaryFrom.value,
        salaryTo: inputs.salaryTo.value,
        experienceFrom: inputs.experienceFrom.value,
        experienceTo: inputs.experienceTo.value,
        employmentType,
        workNature,
      },
      onSuccess: (validData) => postJob(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputs}>
        <Input
          label="Title"
          placeholder="Job Title"
          value={inputs.title.value}
          valueKey="title"
          name="jobTitle"
          errorMessage={inputs.title.errorMessage}
          isRequired
          onChange={handleInputChange}
        />

        <SearchInput
          label="Location"
          placeholder="Job Location"
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

        <SearchInput
          label="Skills / Requirements"
          placeholder="Skills and Requirements"
          value={inputs.skills.value.name}
          valueKey="skills"
          displayKey="name"
          errorMessage={inputs.skills.errorMessage}
          results={skills.results}
          isLoading={skills.isLoading}
          isRequired
          isMultiple
          onChange={handleSkillsChange}
          onChose={handleSkillsChose}
        />

        <InputGroup
          addon="to"
          label="Experience"
          onChange={handleInputChange}
          isRequired
          inputs={[
            {
              placeholder: "Experience from",
              value: inputs.experienceFrom.value,
              valueKey: "experienceFrom",
              errorMessage: inputs.experienceFrom.errorMessage,
              name: "experienceFrom",
              type: "number",
            },
            {
              placeholder: "Experience to",
              value: inputs.experienceTo.value,
              valueKey: "experienceTo",
              errorMessage: inputs.experienceTo.errorMessage,
              name: "experienceTo",
              type: "number",
            },
          ]}
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
                  inputs.employmentType[POST_JOB.EMPLOYMENT_TYPES.FULL_TIME],
                valueKey: POST_JOB.EMPLOYMENT_TYPES.FULL_TIME,
              },
              {
                label: "Part-time",
                isChecked:
                  inputs.employmentType[POST_JOB.EMPLOYMENT_TYPES.PART_TIME],
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
                isChecked: inputs.workNature[POST_JOB.WORK_NATURE_TYPES.REMOTE],
                valueKey: POST_JOB.WORK_NATURE_TYPES.REMOTE,
              },
              {
                label: "Hybrid",
                isChecked: inputs.workNature[POST_JOB.WORK_NATURE_TYPES.HYBRID],
                valueKey: POST_JOB.WORK_NATURE_TYPES.HYBRID,
              },
            ]}
            isRequired
          />
        </div>

        <TextArea
          label="Description"
          placeholder="Job Description"
          value={inputs.description.value}
          valueKey="description"
          errorMessage={inputs.description.errorMessage}
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
  );
}

export default PostJobForm;
