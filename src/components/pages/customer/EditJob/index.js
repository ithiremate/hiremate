import FORM from "../../../../utils/constants/form";

import Form from "../../../base/Form";

import styles from "./index.module.scss";

function EditJob() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit job</h1>

      <div className={styles.content}>
        <Form type={FORM.FORM_TYPES.POST_JOB} />
      </div>
    </div>
  );
}

export default EditJob;
