import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import classNames from "classnames";

import Button from "../../../../shared/Button";

import styles from "./index.module.scss";
import { updateUserFieldInDb } from "../../../../../store/actions/userActions";
import FB from "../../../../../utils/constants/fb";

function UserTypeForm({ currentTheme }) {
  const dispatch = useDispatch();

  const handleSugmit = (type) => (e) => {
    e.preventDefault();

    dispatch(updateUserFieldInDb({ valueKey: "userType", value: type }));
  };

  return (
    <form onSubmit={handleSugmit()} className={styles.form}>
      <Button
        className={styles.button}
        label="looking to hire"
        type="submit"
        onClick={handleSugmit(FB.USER_TYPES.CUSTOMER)}
      />

      <p
        className={classNames(
          styles.subtitle,
          styles[`subtitle_${currentTheme}`],
        )}>
        or
      </p>

      <Button
        className={styles.button}
        label="searching for work"
        type="submit"
        onClick={handleSugmit(FB.USER_TYPES.TALENT)}
      />
    </form>
  );
}

UserTypeForm.propTypes = {
  currentTheme: PropTypes.string.isRequired,
};

export default UserTypeForm;
