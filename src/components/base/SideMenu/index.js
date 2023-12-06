/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import classNames from "classnames";

import { ROOT } from "../../../utils/constants/routes";
import THEME from "../../../utils/constants/theme";

import useClickOutside from "../../../hooks/useClickOutside";
import useSideMenuRoutes from "../../../hooks/useSideMenuRotes";

import Logo from "../../shared/Logo";
import ProfileAvatar from "../../shared/ProfileAvatar";
import Navigation from "./molecules/Navigation";
import Switch from "../../shared/Switch";

import styles from "./index.module.scss";
import { updateTheme } from "../../../store/slices/themeSlice";

function SideMenu({ isVisible, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { pathname } = useLocation();
  const { currentTheme } = useSelector((state) => state.theme);
  const { dbUser } = useSelector((state) => state.user);

  const sideMenuRoutes = useSideMenuRoutes();
  const menuRef = useRef(null);

  const handleLogoClick = () => {
    navigate(ROOT);
  };

  const handleThemeChange = (isDark) => {
    const newTheme = isDark ? THEME.THEME_DARK_TYPE : THEME.THEME_LIGHT_TYPE;

    dispatch(updateTheme(newTheme));
    localStorage.setItem(THEME.THEME_TYPE_KEY, newTheme);
  };

  useEffect(onClose, [pathname]);

  useClickOutside(menuRef, onClose);

  return (
    <div
      ref={menuRef}
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
        {
          [styles.container_visible]: isVisible,
        },
      )}>
      <div
        className={classNames(
          styles.content,
          styles[`content_${currentTheme}`],
        )}>
        <div className={styles.top}>
          <Logo
            type="default"
            className={styles.logo}
            onClick={handleLogoClick}
          />

          <div
            className={classNames(
              styles.profileAvatarContainer,
              styles[`profileAvatarContainer_${currentTheme}`],
            )}>
            <ProfileAvatar />

            <p className={styles.greeting}>Hi, {dbUser.companyName}</p>
          </div>

          <Navigation routes={sideMenuRoutes} />
        </div>

        <div className={styles.bottom}>
          <Switch
            leftLabel="Light"
            rightLabel="Dark"
            isChecked={currentTheme === THEME.THEME_DARK_TYPE}
            onChange={handleThemeChange}
          />
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
