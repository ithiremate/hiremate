import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import TOAST from "../../../../../utils/constants/toast";

import styles from "./index.module.scss";

function Toast({ isVisible, message, type }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}_${type}`],
        { [styles.container_visible]: isVisible },
      )}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

Toast.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["", TOAST.ERROR_TYPE, TOAST.SUCCESS_TYPE]).isRequired,
};

export default Toast;
