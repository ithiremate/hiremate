import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import classNames from "classnames";

import Logo from "../../shared/Logo";
import SvgButton from "../../shared/SvgButton";

import styles from "./index.module.scss";

function Header({ isMenuVisible, onMenuToggle }) {
  const navigate = useNavigate();
  const { currentTheme } = useSelector((state) => state.theme);

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <header
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
      )}>
      <Logo type="small" className={styles.logo} onClick={handleLogoClick} />

      <SvgButton
        icon="menu"
        onClick={onMenuToggle(true)}
        className={classNames(styles.menuIcon, {
          [styles.menuIcon_visible]: !isMenuVisible,
        })}
      />

      <SvgButton
        icon="cross"
        onClick={onMenuToggle(false)}
        className={classNames(styles.menuIcon, {
          [styles.menuIcon_visible]: isMenuVisible,
        })}
      />
    </header>
  );
}

Header.propTypes = {
  isMenuVisible: PropTypes.bool.isRequired,
  onMenuToggle: PropTypes.func.isRequired,
};

export default Header;
