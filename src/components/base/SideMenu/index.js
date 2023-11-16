import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";

function SideMenu({ isVisible }) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <div
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
        { [styles.container_visible]: isVisible },
      )}>
      <nav />
    </div>
  );
}

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
};

export default SideMenu;
