import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function Logo({ type, onClick, className }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <SvgIcon
      type={`logo_${currentTheme}_${type}`}
      className={classNames(styles.logo, styles[`logo_${type}`], className)}
      onClick={onClick}
    />
  );
}

Logo.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

Logo.defaultProps = {
  className: "",
  onClick: () => {},
};

export default Logo;
