import PropTypes from "prop-types";

import styles from "./index.module.scss";
import FB from "../../../../../utils/constants/fb";

function Title({ user }) {
  if (!user.userType) {
    return <h1 className={styles.title}>What are you looking for?</h1>;
  }

  if (user.userType === FB.USER_TYPES.CUSTOMER) {
    return <h1 className={styles.title}>Tell us about your company</h1>;
  }

  if (user.userType === FB.USER_TYPES.TALENT) {
    return <h1 className={styles.title}>Tell us about yourself</h1>;
  }

  return <></>;
}

Title.propTypes = {
  user: PropTypes.shape({
    userType: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
  }).isRequired,
};

export default Title;
