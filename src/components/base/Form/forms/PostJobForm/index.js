import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import FORM from "../../../../../utils/constants/form";
import POST_JOB from "../../../../../utils/constants/postJob";
import { validatePostJob } from "../../../../../utils/validation";
import useSearch from "../../../../../hooks/useSearch";
import { hideModal } from "../../../../../store/slices/modalSlice";

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
import JobAutoscreening from "../../../../shared/JobAutoscreening";
import Checkbox from "../../../../shared/Checkbox";

import styles from "./index.module.scss";
import { JOBS_NEW } from "../../../../../utils/constants/routes";

function DummyJob() {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.dummyContent}>
        <p className={styles.dummyTitle}>Job not found</p>

        <Button label="post new job" onClick={() => navigate(JOBS_NEW)} />
      </div>
    </div>
  );
}

function PostJobForm() {
  const dispatch = useDispatch();

  const { jobId } = useParams();
  const { list } = useSelector((state) => state.jobs);
  const { dbUser } = useSelector((state) => state.user);

  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState(FORM.POST_JOB);

  const job = useMemo(() => list.find((el) => el.id === jobId), [jobId]);

  const { locations, skills, searchHandlers, resetHandlers } = useSearch();

  const actionType = job
    ? POST_JOB.ACTION_TYPES.EDIT
    : POST_JOB.ACTION_TYPES.PUBLISH;

  const resetFields = () => setInputs(FORM.POST_JOB);

  const postJob = async (validData) => {
    setIsLoading(true);

    if (actionType === POST_JOB.ACTION_TYPES.PUBLISH) {
      await dispatch(postNewJob({ ...validData }));

      resetFields();
    }

    if (actionType === POST_JOB.ACTION_TYPES.EDIT) {
      await dispatch(editExistedJob({ ...job, ...validData }));
      dispatch(hideModal());
    }

    setIsLoading(false);
  };

  const handleInputChange = ({ value, valueKey }) => {
    setInputs((prev) => {
      const output = structuredClone(prev);

      output[valueKey].value = value;
      output[valueKey].errorMessage = "";

      return output;
    });
  };

  const handleLocationChange = ({ value: display_name }) => {
    setInputs((prev) => {
      const output = structuredClone(prev);

      output.location.value = { display_name };
      output.location.errorMessage = "";

      return output;
    });

    searchHandlers.locationSearch(display_name);
  };

  const handleSkillsChange = ({ value: name }) => {
    setInputs((prev) => {
      const output = structuredClone(prev);

      output.skills.value = { name };
      output.skills.errorMessage = "";

      return output;
    });

    searchHandlers.skillsSearch(name);
  };

  const handleInputGroupChange =
    (inputKey) =>
    ({ valueKey, value }) => {
      setInputs((prev) => {
        const output = structuredClone(prev);

        output[inputKey].inputs[valueKey].value = value;
        output[inputKey].inputs[valueKey].errorMessage = "";

        return output;
      });
    };

  const handleCheckboxChange =
    (inputKey) =>
    ({ value, valueKey }) => {
      setInputs((prev) => {
        const output = structuredClone(prev);

        output[inputKey].inputs[valueKey].isChecked = value;
        output[inputKey].errorMessage = "";

        return output;
      });
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
      if (errorKey === "location") {
        updatedInputs[errorKey].errorMessage = "Please enter job location";
      } else if (errorKey === "experienceFrom") {
        updatedInputs.experience.inputs[errorKey].errorMessage =
          errors[errorKey];
      } else if (errorKey === "experienceTo") {
        updatedInputs.experience.inputs[errorKey].errorMessage =
          errors[errorKey];
      } else if (errorKey === "salaryFrom") {
        updatedInputs.salary.inputs[errorKey].errorMessage = errors[errorKey];
      } else if (errorKey === "salaryTo") {
        updatedInputs.salary.inputs[errorKey].errorMessage = errors[errorKey];
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
    const status = inputs.isDraft.value
      ? POST_JOB.STATUS_TYPES.DRAFT
      : POST_JOB.STATUS_TYPES.PUBLISHED;

    Object.values(POST_JOB.EMPLOYMENT_TYPES).forEach((type) => {
      if (inputs.employmentType.inputs[type].isChecked) {
        employmentType.push(type);
      }
    });

    Object.values(POST_JOB.WORK_NATURE_TYPES).forEach((type) => {
      if (inputs.workNature.inputs[type].isChecked) {
        workNature.push(type);
      }
    });

    validatePostJob({
      data: {
        title: inputs.jobTitle.value,
        description: inputs.description.value,
        skills: inputs.skills.chosen,
        location: inputs.location.value,
        experienceFrom: inputs.experience.inputs.experienceFrom.value,
        experienceTo: inputs.experience.inputs.experienceTo.value,
        salaryFrom: inputs.salary.inputs.salaryFrom.value,
        salaryTo: inputs.salary.inputs.salaryTo.value,
        contactPerson: inputs.contactPerson.value,
        contactPhone: inputs.contactPhone.value,
        additionalContact: inputs.additionalContact.value,
        autoscreening: inputs.autoscreening,
        companyName: dbUser.companyName,
        employmentType,
        workNature,
        status,
      },
      onSuccess: (validData) => postJob(validData),
      onError: (errors) => handleFormError(errors),
    });
  };

  const initInputs = () => {
    setInputs((prev) => {
      const output = structuredClone(prev);

      output.jobTitle.value = job.title;
      output.location.value = job.location;
      output.contactPerson.value = job.contactPerson ?? "";
      output.contactPhone.value = job.contactPhone ?? "";
      output.additionalContact.value = job.additionalContact ?? "";
      output.skills.chosen = job.skills;
      output.experience.inputs.experienceFrom.value = job.experienceFrom;
      output.experience.inputs.experienceTo.value = job.experienceTo;
      output.salary.inputs.salaryFrom.value = job.salaryFrom;
      output.salary.inputs.salaryTo.value = job.salaryTo;
      output.description.value = job.description;
      output.autoscreening.questions = job.autoscreening.questions;
      output.isDraft.isChecked = job.status === POST_JOB.STATUS_TYPES.DRAFT;

      output.employmentType.inputs[
        POST_JOB.EMPLOYMENT_TYPES.FULL_TIME
      ].isChecked = job.employmentType.includes(
        POST_JOB.EMPLOYMENT_TYPES.FULL_TIME,
      );

      output.employmentType.inputs[
        POST_JOB.EMPLOYMENT_TYPES.PART_TIME
      ].isChecked = job.employmentType.includes(
        POST_JOB.EMPLOYMENT_TYPES.PART_TIME,
      );

      output.employmentType.inputs[
        POST_JOB.EMPLOYMENT_TYPES.PROJECT
      ].isChecked = job.employmentType.includes(
        POST_JOB.EMPLOYMENT_TYPES.PROJECT,
      );

      output.workNature.inputs[POST_JOB.WORK_NATURE_TYPES.ON_SITE].isChecked =
        job.workNature.includes(POST_JOB.WORK_NATURE_TYPES.ON_SITE);

      output.workNature.inputs[POST_JOB.WORK_NATURE_TYPES.REMOTE].isChecked =
        job.workNature.includes(POST_JOB.WORK_NATURE_TYPES.REMOTE);

      output.workNature.inputs[POST_JOB.WORK_NATURE_TYPES.HYBRID].isChecked =
        job.workNature.includes(POST_JOB.WORK_NATURE_TYPES.HYBRID);

      return output;
    });
  };

  useEffect(() => {
    if (job) {
      initInputs();
    }
  }, [job]);

  if (jobId && !job) {
    return <DummyJob />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        {Object.entries(inputs).map(([inputKey, input]) => {
          const {
            type,
            label,
            placeholder,
            value,
            chosen,
            displayKey,
            errorMessage,
            isRequired,
            addon,
            inputs: groupInputs,
            isChecked,
            questions,
          } = input;

          if (type === FORM.FIELD_TYPES.INPUT) {
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
                onChange={handleInputChange}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.LOCATION) {
            return (
              <SearchInput
                key={inputKey}
                label={label}
                placeholder={placeholder}
                value={value[displayKey]}
                valueKey={inputKey}
                displayKey={displayKey}
                name={inputKey}
                errorMessage={errorMessage}
                results={locations.results}
                chosen={chosen}
                isLoading={locations.isLoading}
                isRequired
                onChange={handleLocationChange}
                onChose={handleLocationChose}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.SKILLS) {
            return (
              <SearchInput
                key={inputKey}
                label={label}
                placeholder={placeholder}
                value={value.name}
                chosen={chosen}
                valueKey={inputKey}
                displayKey={displayKey}
                name={inputKey}
                errorMessage={errorMessage}
                results={skills.results}
                isLoading={skills.isLoading}
                isRequired
                isMultiple
                onChange={handleSkillsChange}
                onChose={handleSkillsChose}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.INPUT_GROUP) {
            return (
              <InputGroup
                key={inputKey}
                addon={addon}
                label={label}
                onChange={handleInputGroupChange(inputKey)}
                inputs={groupInputs}
                isRequired={isRequired}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.CHECKBOX_GROUP) {
            return (
              <CheckboxGroup
                key={inputKey}
                label={label}
                isError={!!errorMessage}
                errorMessage={errorMessage}
                onChange={handleCheckboxChange(inputKey)}
                inputs={groupInputs}
                isRequired={isRequired}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.TEXT_AREA) {
            return (
              <TextArea
                key={inputKey}
                label={label}
                placeholder={placeholder}
                value={value}
                valueKey={inputKey}
                errorMessage={errorMessage}
                onChange={handleInputChange}
                isRequired={isRequired}
              />
            );
          }

          if (type === FORM.FIELD_TYPES.AUTOSCREENING) {
            return <JobAutoscreening key={inputKey} questions={questions} />;
          }

          if (type === FORM.FIELD_TYPES.CHECKBOX) {
            return (
              <Checkbox
                key={inputKey}
                label={label}
                isChecked={isChecked}
                valueKey={inputKey}
                onChange={handleInputChange}
              />
            );
          }

          return <div key={inputKey} />;
        })}
      </div>

      <div className={styles.buttonContainer}>
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

export default PostJobForm;
