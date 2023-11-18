import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function CustomNavLink({ label, to, icon, className }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        classNames(styles.link, styles[`link_${currentTheme}`], className, {
          [styles[`link_${currentTheme}_active`]]: isActive,
        })
      }>
      {icon && <SvgIcon type={icon} className={styles.icon} />}
      {label}
    </NavLink>
  );
}

CustomNavLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
  className: PropTypes.string,
};

CustomNavLink.defaultProps = {
  icon: "",
  className: "",
};

export default CustomNavLink;
