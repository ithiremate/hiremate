import { useCallback } from "react";
import { useSelector } from "react-redux";

import Title from "./molecules/Title";
import UserTypeForm from "./molecules/UserTypeForm";

import styles from "./index.module.scss";
import FB from "../../../utils/constants/fb";
import Form from "../../base/Form";
import FORM from "../../../utils/constants/form";

function Wizard() {
  const { dbUser } = useSelector((state) => state.user);
  const { currentTheme } = useSelector((state) => state.theme);

  const renderForm = useCallback(() => {
    if (!dbUser.userType) {
      return <UserTypeForm currentTheme={currentTheme} />;
    }

    if (dbUser.userType === FB.USER_TYPES.CUSTOMER) {
      return <Form type={FORM.FORM_TYPES.CUSTOMER_WIZARD} />;
    }

    return <Form type={FORM.FORM_TYPES.TALENT_WIZARD} />;
  }, [dbUser]);

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Title user={dbUser} currentTheme={currentTheme} />

        {renderForm()}
      </div>
    </div>
  );
}

export default Wizard;
