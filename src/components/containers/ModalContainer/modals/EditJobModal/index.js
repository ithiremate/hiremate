import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

import FORM from "../../../../../utils/constants/form";
import POST_JOB from "../../../../../utils/constants/postJob";
import { hideModal } from "../../../../../store/slices/modalSlice";

import Form from "../../../../base/Form";

import styles from "./index.module.scss";

function EditJobModal({ data }) {
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState(POST_JOB.DEFAULT_FORM_FIELDS);

  const prepareInputs = () => {
    const output = structuredClone(inputs);

    output.description.value = data.description;
    output.contactPerson.value = data.contactPerson ?? "";
    output.contactPhone.value = data.contactPhone ?? "";
    output.additionalContact.value = data.additionalContact ?? "";
    output.experienceFrom.value = `${data.experienceFrom}`;
    output.experienceTo.value = `${data.experienceTo}`;
    output.location.value = data.location;
    output.salaryFrom.value = `${data.salaryFrom}`;
    output.salaryTo.value = `${data.salaryTo}`;
    output.skills.chosen = data.skills;
    output.title.value = data.title;
    output.isDraft.value = data.status === POST_JOB.STATUS_TYPES.DRAFT;

    output.employmentType[POST_JOB.EMPLOYMENT_TYPES.FULL_TIME] =
      data.employmentType.includes(POST_JOB.EMPLOYMENT_TYPES.FULL_TIME);

    output.employmentType[POST_JOB.EMPLOYMENT_TYPES.PART_TIME] =
      data.employmentType.includes(POST_JOB.EMPLOYMENT_TYPES.PART_TIME);

    output.employmentType[POST_JOB.EMPLOYMENT_TYPES.PROJECT] =
      data.employmentType.includes(POST_JOB.EMPLOYMENT_TYPES.PROJECT);

    output.workNature[POST_JOB.WORK_NATURE_TYPES.ON_SITE] =
      data.workNature.includes(POST_JOB.WORK_NATURE_TYPES.ON_SITE);

    output.workNature[POST_JOB.WORK_NATURE_TYPES.REMOTE] =
      data.workNature.includes(POST_JOB.WORK_NATURE_TYPES.REMOTE);

    output.workNature[POST_JOB.WORK_NATURE_TYPES.HYBRID] =
      data.workNature.includes(POST_JOB.WORK_NATURE_TYPES.HYBRID);

    setInputs(output);
  };

  const handleSubmit = async () => {
    dispatch(hideModal());
  };

  useEffect(prepareInputs, []);

  return (
    <div className={styles.container}>
      <Form
        type={FORM.FORM_TYPES.POST_JOB}
        data={{
          actionType: POST_JOB.ACTION_TYPES.EDIT,
          onSubmit: handleSubmit,
          inputs,
        }}
      />
    </div>
  );
}

EditJobModal.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    companyImage: PropTypes.string,
    title: PropTypes.string.isRequired,
    companyName: PropTypes.string.isRequired,
    contactPerson: PropTypes.string,
    contactPhone: PropTypes.string,
    additionalContact: PropTypes.string,
    experienceFrom: PropTypes.number.isRequired,
    experienceTo: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    salaryFrom: PropTypes.number.isRequired,
    salaryTo: PropTypes.number.isRequired,
    employmentType: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    workNature: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    skills: PropTypes.arrayOf(
      PropTypes.shape({ name: PropTypes.string }).isRequired,
    ).isRequired,
    location: PropTypes.shape({
      display_name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default EditJobModal;
