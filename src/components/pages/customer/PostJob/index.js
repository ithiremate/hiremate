import FORM from "../../../../utils/constants/form";

import Form from "../../../base/Form";

import styles from "./index.module.scss";

function PostJob() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Post new job</h1>

      <div className={styles.content}>
        <Form type={FORM.FORM_TYPES.POST_JOB} />
      </div>
    </div>
  );
}

export default PostJob;
