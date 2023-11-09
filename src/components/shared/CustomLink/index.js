import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";

import styles from "./index.module.scss";

function CustomLink({ label, to }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <Link
      to={to}
      className={classNames(styles.link, styles[`link_${currentTheme}`])}>
      {label}
    </Link>
  );
}

CustomLink.propTypes = {
  label: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default CustomLink;
