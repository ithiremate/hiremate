/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/control-has-associated-label */
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import classNames from "classnames";

import useClickOutside from "../../../hooks/useClickOutside";

import SvgButton from "../SvgButton";

import styles from "./index.module.scss";
import SvgIcon from "../SvgIcon";

function OptionsMenu({ options }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [isMenuVisible, setIsMenuVisible] = useState(null);

  const clickOutsideRef = useRef(null);

  const handleOptionClick = (option) => () => {
    setIsMenuVisible(false);
    option.onClick();
  };

  useClickOutside(clickOutsideRef, () => setIsMenuVisible(false));

  return (
    <div className={styles.container}>
      <SvgButton icon="options" onClick={() => setIsMenuVisible(true)} />

      <div
        ref={clickOutsideRef}
        className={classNames(
          styles.options,
          styles[`options_${currentTheme}`],
          {
            [styles.options_visible]: isMenuVisible,
          },
        )}>
        {options.map((option, index) => {
          const { icon, label } = option;

          return (
            <div
              key={option.label}
              role="button"
              tabIndex={index + 1}
              onClick={handleOptionClick(option)}
              className={classNames(
                styles.option,
                styles[`option_${currentTheme}`],
              )}>
              <SvgIcon type={icon} />
              <span>{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

OptionsMenu.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.string,
      label: PropTypes.string,
      onClick: PropTypes.func,
    }),
  ).isRequired,
};

export default OptionsMenu;
