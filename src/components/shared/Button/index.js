/* eslint-disable react/button-has-type */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";
import LoadingIndicator from "../LoadingIndicator";

function Button({ label, type, isLoading, className }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <button
      type={type}
      disabled={isLoading}
      className={classNames(
        styles.button,
        styles[`button_${currentTheme}`],
        { [styles[`button_loading_${currentTheme}`]]: isLoading },
        className,
      )}>
      {isLoading ? <LoadingIndicator width={20} height={20} /> : label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  isLoading: PropTypes.bool,
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  isLoading: false,
  className: "",
};

export default Button;
