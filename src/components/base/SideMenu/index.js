import { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import useClickOutside from "../../../hooks/useClickOutside";

import styles from "./index.module.scss";

function SideMenu({ isVisible, onClose }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const menuRef = useRef(null);

  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
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
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
