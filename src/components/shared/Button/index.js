/* eslint-disable react/button-has-type */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";

function Button({ label, type, className }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <button
      type={type}
      className={classNames(
        styles.button,
        styles[`button_${currentTheme}`],
        className,
      )}>
      {label}
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  className: "",
};

export default Button;
