/* eslint-disable react/button-has-type */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";
import LoadingIndicator from "../LoadingIndicator";

function Button({ label, type, tabIndex, isLoading, className, onClick }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <button
      type={type}
      tabIndex={tabIndex}
      disabled={isLoading}
      onClick={onClick}
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
  tabIndex: PropTypes.number,
  isLoading: PropTypes.bool,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: "button",
  tabIndex: undefined,
  isLoading: false,
  className: "",
  onClick: () => {},
};

export default Button;
