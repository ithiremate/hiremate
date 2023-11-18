/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useRef } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import classNames from "classnames";

import useClickOutside from "../../../hooks/useClickOutside";

import { ROOT } from "../../../utils/constants/routes";

import Logo from "../../shared/Logo";
import ProfileAvatar from "../../shared/ProfileAvatar";

import styles from "./index.module.scss";

function SideMenu({ isVisible, onClose }) {
  const navigate = useNavigate();
  const { currentTheme } = useSelector((state) => state.theme);
  const { dbUser } = useSelector((state) => state.user);

  const menuRef = useRef(null);

  const handleLogoClick = () => {
    navigate(ROOT);
  };

  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className={classNames(styles.container, {
        [styles.container_visible]: isVisible,
      })}>
      <div
        className={classNames(
          styles.content,
          styles[`content_${currentTheme}`],
        )}>
        <Logo
          type="default"
          className={styles.logo}
          onClick={handleLogoClick}
        />

        <div className={styles.profileAvatarContainer}>
          <ProfileAvatar />

          <p className={styles.greeting}>Hello {dbUser.companyName}</p>
        </div>
      </div>

      <div
        onClick={onClose}
        className={classNames(styles.backdrop, {
          [styles.backdrop_visible]: isVisible,
          [styles[`backdrop_visible_${currentTheme}`]]: isVisible,
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
