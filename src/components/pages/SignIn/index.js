import FORM from "../../../utils/constants/form";

import Form from "../../base/Form";
import CustomLink from "../../shared/CustomLink";

import styles from "./index.module.scss";

function SignIn() {
  return (
    <div className={styles.container}>
      <Form type={FORM.FORM_TYPES.SIGN_IN} />

      <p className={styles.navigateText}>
        Haven&#39;t an account yet?{" "}
        <CustomLink label="Register" to="/sign-up" />
      </p>
    </div>
  );
}

export default SignIn;
