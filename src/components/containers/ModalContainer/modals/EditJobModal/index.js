import FORM from "../../../../../utils/constants/form";

import Form from "../../../../base/Form";

import styles from "./index.module.scss";

function EditJobModal() {
  return (
    <div className={styles.container}>
      <Form type={FORM.FORM_TYPES.POST_JOB} />
    </div>
  );
}

export default EditJobModal;
