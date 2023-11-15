import { useCallback } from "react";
import { useSelector } from "react-redux";

import Title from "./molecules/Title";
import UserTypeForm from "./molecules/UserTypeForm";
import CustomerForm from "./molecules/CustomerForm";
import TalentForm from "./molecules/TalentForm";

import styles from "./index.module.scss";
import FB from "../../../utils/constants/fb";

function Wizard() {
  const { dbUser } = useSelector((state) => state.user);
  const { currentTheme } = useSelector((state) => state.theme);

  const renderForm = useCallback(() => {
    if (!dbUser.userType) {
      return <UserTypeForm currentTheme={currentTheme} />;
    }

    if (dbUser.userType === FB.USER_TYPES.CUSTOMER) {
      return <CustomerForm />;
    }

    return <TalentForm />;
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
