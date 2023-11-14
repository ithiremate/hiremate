import { useCallback } from "react";
import { useSelector } from "react-redux";

import Title from "./molecules/Title";
import UserTypeForm from "./molecules/UserTypeForm";

import styles from "./index.module.scss";

function Wizard() {
  const { dbUser } = useSelector((state) => state.user);
  const { currentTheme } = useSelector((state) => state.theme);

  const renderForm = useCallback(() => {
    if (!dbUser.userType) {
      return <UserTypeForm currentTheme={currentTheme} />;
    }

    return <></>;
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
