/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import useClickOutside from "../../../hooks/useClickOutside";

import Logo from "../../shared/Logo";
import ProfileAvatar from "../../shared/ProfileAvatar";

import styles from "./index.module.scss";

function SideMenu({ isVisible, onClose }) {
  const navigate = useNavigate();
  const { currentTheme } = useSelector((state) => state.theme);

  const menuRef = useRef(null);

  const handleLogoClick = () => {
    navigate("/");
  };

  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
        { [styles.container_visible]: isVisible },
      )}>
      <Logo type="default" className={styles.logo} onClick={handleLogoClick} />

      <ProfileAvatar />

      <div
        onClick={onClose}
        className={classNames(styles.backdrop, {
          [styles.backdrop_visible]: isVisible,
        })}
      />
    </div>
  );
}

SideMenu.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default SideMenu;
