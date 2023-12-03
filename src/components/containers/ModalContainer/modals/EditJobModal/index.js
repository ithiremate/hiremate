import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import FORM from "../../../../../utils/constants/form";
import POST_JOB from "../../../../../utils/constants/postJob";
import { editExistedJob } from "../../../../../store/actions/jobsActions";
import { hideModal } from "../../../../../store/slices/modalSlice";

import Form from "../../../../base/Form";

import styles from "./index.module.scss";

function EditJobModal() {
  const dispatch = useDispatch();

  const { data } = useSelector((state) => state.modal);

  const [inputs, setInputs] = useState(POST_JOB.DEFAULT_FORM_FIELDS);

  const prepareInputs = () => {
    const output = structuredClone(inputs);

    output.description.value = data.description;

    output.experienceFrom.value = `${data.experienceFrom}`;
    output.experienceTo.value = `${data.experienceTo}`;
    output.location.value = data.location;
    output.salaryFrom.value = `${data.salaryFrom}`;
    output.salaryTo.value = `${data.salaryTo}`;
    output.skills.chosen = data.skills;
    output.title.value = data.title;

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

  const handleSubmit = async (editedJob) => {
    await dispatch(editExistedJob({ ...data, ...editedJob }));
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

export default EditJobModal;
