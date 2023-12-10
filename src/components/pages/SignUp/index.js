import CustomLink from "../../shared/CustomLink";

import FORM from "../../../utils/constants/form";

import Form from "../../base/Form";

import styles from "./index.module.scss";

function SignIn() {
  return (
    <div className={styles.container}>
      <Form type={FORM.FORM_TYPES.SIGN_UP} />

      <p className={styles.navigateText}>
        Have an account? <CustomLink label="Sign In" to="/sign-in" />
      </p>
    </div>
  );
}

export default SignIn;
