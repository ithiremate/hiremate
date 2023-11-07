import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function Logo({ type, className }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <SvgIcon
      type={`logo_${currentTheme}_${type}`}
      className={classNames(styles.logo, className)}
    />
  );
}

Logo.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
};

Logo.defaultProps = {
  className: "",
};

export default Logo;
