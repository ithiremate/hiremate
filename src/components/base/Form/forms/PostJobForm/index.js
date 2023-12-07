import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import POST_JOB from "../../../../../utils/constants/postJob";
import { validatePostJob } from "../../../../../utils/validation";
import useSearch from "../../../../../hooks/useSearch";

import {
  editExistedJob,
  postNewJob,
} from "../../../../../store/actions/jobsActions";

import Button from "../../../../shared/Button";
import CheckboxGroup from "../../../../shared/CheckboxGroup";
import Input from "../../../../shared/Input";
import InputGroup from "../../../../shared/InputGroup";
import SearchInput from "../../../../shared/SearchInput";
import TextArea from "../../../../shared/TextArea";
import Checkbox from "../../../../shared/Checkbox";

import styles from "./index.module.scss";

function PostJobForm({ actionType, inputs, onSubmit }) {
  const dispatch = useDispatch();

  const { dbUser } = useSelector((state) => state.user);
  const { data } = useSelector((state) => state.modal);

  const [isLoading, setIsLoading] = useState(false);
  const [internalInputs, setInternalInputs] = useState(inputs);

  const { locations, skills, searchHandlers, resetHandlers } = useSearch();

  const resetFields = () => setInternalInputs(POST_JOB.DEFAULT_FORM_FIELDS);

  const postJob = async (validData) => {
    setIsLoading(true);

    if (actionType === POST_JOB.ACTION_TYPES.POST) {
      await dispatch(
        postNewJob({ ...validData, companyName: dbUser.companyName }),
      );
    }

    if (actionType === POST_JOB.ACTION_TYPES.EDIT) {
      await dispatch(editExistedJob({ ...data, ...validData }));
    }

    if (onSubmit) {
      onSubmit();
    }

    resetFields();
    setIsLoading(false);
  };

  const handleInputChange = ({ value, valueKey }) => {
    setInternalInputs((prev) => ({
      ...prev,
      [valueKey]: { errorMessage: "", value },
    }));
  };

  const handleLocationChange = ({ value }) => {
    setInternalInputs((prev) => ({
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
    setInternalInputs((prev) => ({
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
      setInternalInputs((prev) => ({
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
    setInternalInputs((prev) => ({
      ...prev,
      [valueKey]: { ...prev[valueKey], errorMessage: "", chosen: items },
    }));
  };

  const handleFormError = (errors) => {
    const updatedInputs = structuredClone(internalInputs);

    Object.keys(errors).forEach((errorKey) => {
      if (updatedInputs[errorKey] && errorKey === "location") {
        updatedInputs[errorKey].errorMessage = "Please enter job location";
      } else if (updatedInputs[errorKey]) {
        updatedInputs[errorKey].errorMessage = errors[errorKey];
      }
    });

    setInternalInputs(updatedInputs);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const employmentType = [];
    const workNature = [];
    const status = internalInputs.isDraft.value
      ? POST_JOB.STATUS_TYPES.DRAFT
      : POST_JOB.STATUS_TYPES.PUBLISHED;

    Object.values(POST_JOB.EMPLOYMENT_TYPES).forEach((type) => {
      if (internalInputs.employmentType[type]) {
        employmentType.push(type);
      }
    });

    Object.values(POST_JOB.WORK_NATURE_TYPES).forEach((type) => {
      if (internalInputs.workNature[type]) {
        workNature.push(type);
      }
    });

    validatePostJob({
      data: {
        title: internalInputs.title.value,
        description: internalInputs.description.value,
        skills: internalInputs.skills.chosen,
        location: internalInputs.location.value,
        salaryFrom: internalInputs.salaryFrom.value,
        salaryTo: internalInputs.salaryTo.value,
        experienceFrom: internalInputs.experienceFrom.value,
        experienceTo: internalInputs.experienceTo.value,
        contactPerson: internalInputs.contactPerson.value,
        contactPhone: internalInputs.contactPhone.value,
        additionalContact: internalInputs.additionalContact.value,
        employmentType,
        workNature,
        status,
      },
      onSuccess: (validData) => postJob(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  useEffect(() => setInternalInputs(inputs), [inputs]);

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <Input
          label="Title"
          placeholder="Job Title"
          value={internalInputs.title.value}
          valueKey="title"
          name="jobTitle"
          errorMessage={internalInputs.title.errorMessage}
          isRequired
          onChange={handleInputChange}
        />

        <SearchInput
          label="Location"
          placeholder="Job Location"
          value={internalInputs.location.value.display_name}
          valueKey="location"
          displayKey="display_name"
          errorMessage={internalInputs.location.errorMessage}
          results={locations.results}
          isLoading={locations.isLoading}
          isRequired
          onChange={handleLocationChange}
          onChose={handleLocationChose}
        />

        <Input
          label="Contact Person"
          placeholder="Contact Person"
          value={internalInputs.contactPerson.value}
          valueKey="contactPerson"
          name="contactPerson"
          onChange={handleInputChange}
        />

        <Input
          label="Contact Phone"
          placeholder="Contact Phone"
          value={internalInputs.contactPhone.value}
          valueKey="contactPhone"
          name="contactPhone"
          onChange={handleInputChange}
        />

        <Input
          label="Additional Contact"
          placeholder="Additional Contact: skype, telegram etc."
          value={internalInputs.additionalContact.value}
          valueKey="additionalContact"
          name="additionalContact"
          onChange={handleInputChange}
        />

        <SearchInput
          label="Skills / Requirements"
          placeholder="Skills and Requirements"
          value={internalInputs.skills.value.name}
          chosen={internalInputs.skills.chosen}
          valueKey="skills"
          displayKey="name"
          errorMessage={internalInputs.skills.errorMessage}
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
              value: internalInputs.experienceFrom.value,
              valueKey: "experienceFrom",
              errorMessage: internalInputs.experienceFrom.errorMessage,
              name: "experienceFrom",
              type: "number",
            },
            {
              placeholder: "Experience to",
              value: internalInputs.experienceTo.value,
              valueKey: "experienceTo",
              errorMessage: internalInputs.experienceTo.errorMessage,
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
              value: internalInputs.salaryFrom.value,
              valueKey: "salaryFrom",
              errorMessage: internalInputs.salaryFrom.errorMessage,
              name: "salaryFrom",
              type: "number",
            },
            {
              placeholder: "Salary to",
              value: internalInputs.salaryTo.value,
              valueKey: "salaryTo",
              errorMessage: internalInputs.salaryTo.errorMessage,
              name: "salaryTo",
              type: "number",
            },
          ]}
        />

        <div className={styles.doubleRows}>
          <CheckboxGroup
            label="Type of employment"
            isError={!!internalInputs.employmentType.errorMessage}
            errorMessage={internalInputs.employmentType.errorMessage}
            onChange={handleCheckboxChange("employmentType")}
            inputs={[
              {
                label: "Full-time",
                isChecked:
                  internalInputs.employmentType[
                    POST_JOB.EMPLOYMENT_TYPES.FULL_TIME
                  ],
                valueKey: POST_JOB.EMPLOYMENT_TYPES.FULL_TIME,
              },
              {
                label: "Part-time",
                isChecked:
                  internalInputs.employmentType[
                    POST_JOB.EMPLOYMENT_TYPES.PART_TIME
                  ],
                valueKey: POST_JOB.EMPLOYMENT_TYPES.PART_TIME,
              },
              {
                label: "Project",
                isChecked:
                  internalInputs.employmentType[
                    POST_JOB.EMPLOYMENT_TYPES.PROJECT
                  ],
                valueKey: POST_JOB.EMPLOYMENT_TYPES.PROJECT,
              },
            ]}
            isRequired
          />

          <CheckboxGroup
            label="Nature of work"
            isError={!!internalInputs.workNature.errorMessage}
            errorMessage={internalInputs.workNature.errorMessage}
            onChange={handleCheckboxChange("workNature")}
            inputs={[
              {
                label: "On-site",
                isChecked:
                  internalInputs.workNature[POST_JOB.WORK_NATURE_TYPES.ON_SITE],
                valueKey: POST_JOB.WORK_NATURE_TYPES.ON_SITE,
              },
              {
                label: "Remote",
                isChecked:
                  internalInputs.workNature[POST_JOB.WORK_NATURE_TYPES.REMOTE],
                valueKey: POST_JOB.WORK_NATURE_TYPES.REMOTE,
              },
              {
                label: "Hybrid",
                isChecked:
                  internalInputs.workNature[POST_JOB.WORK_NATURE_TYPES.HYBRID],
                valueKey: POST_JOB.WORK_NATURE_TYPES.HYBRID,
              },
            ]}
            isRequired
          />
        </div>

        <TextArea
          label="Description"
          placeholder="Job Description"
          value={internalInputs.description.value}
          valueKey="description"
          errorMessage={internalInputs.description.errorMessage}
          onChange={handleInputChange}
          isRequired
        />

        <Checkbox
          label="Save as draft?"
          isChecked={internalInputs.isDraft.value}
          valueKey="isDraft"
          onChange={handleInputChange}
        />
      </div>

      <div className={styles.buttonsContainer}>
        <Button
          className={styles.button}
          type="submit"
          label="publish"
          isLoading={isLoading}
        />
      </div>
    </form>
  );
}

PostJobForm.propTypes = {
  actionType: PropTypes.oneOf(Object.values(POST_JOB.ACTION_TYPES)),
  onSubmit: PropTypes.oneOfType([PropTypes.func, PropTypes.oneOf([null])]),
  inputs: PropTypes.shape({
    description: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    isDraft: PropTypes.shape({
      value: PropTypes.bool,
    }),
    employmentType: PropTypes.shape({
      fullTime: PropTypes.bool,
      partTime: PropTypes.bool,
      project: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
    experienceFrom: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    experienceTo: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    location: PropTypes.shape({
      value: PropTypes.shape({ display_name: PropTypes.string }),
      errorMessage: PropTypes.string,
    }),
    salaryFrom: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    salaryTo: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    skills: PropTypes.shape({
      value: PropTypes.shape({ name: PropTypes.string }),
      chosen: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
      errorMessage: PropTypes.string,
    }),
    title: PropTypes.shape({
      value: PropTypes.string,
      errorMessage: PropTypes.string,
    }),
    contactPerson: PropTypes.shape({
      value: PropTypes.string,
    }),
    contactPhone: PropTypes.shape({
      value: PropTypes.string,
    }),
    additionalContact: PropTypes.shape({
      value: PropTypes.string,
    }),
    workNature: PropTypes.shape({
      onSite: PropTypes.bool,
      remote: PropTypes.bool,
      hybrid: PropTypes.bool,
      errorMessage: PropTypes.string,
    }),
  }),
};

PostJobForm.defaultProps = {
  actionType: POST_JOB.ACTION_TYPES.POST,
  onSubmit: null,
  inputs: POST_JOB.DEFAULT_FORM_FIELDS,
};

export default PostJobForm;
