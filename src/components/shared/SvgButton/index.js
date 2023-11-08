import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function SvgButton({ icon, className, onClick }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <button
      type="button"
      aria-label={icon}
      className={classNames(
        styles.button,
        styles[`button_${currentTheme}`],
        className,
      )}
      onClick={onClick}>
      <SvgIcon
        type={icon}
        className={classNames(styles.icon, styles[`icon_${currentTheme}`])}
      />
    </button>
  );
}

SvgButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

SvgButton.defaultProps = {
  className: "",
};

export default SvgButton;
