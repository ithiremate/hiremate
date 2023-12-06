/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";

function Switch({ isChecked, leftLabel, rightLabel, onChange }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalIsChecked, setInternalIsChecked] = useState(isChecked);

  const handleClick = (value) => () => {
    setInternalIsChecked(value);
    onChange(value);
  };

  return (
    <div className={styles.container} onClick={handleClick(!internalIsChecked)}>
      <span className={styles.label}>{leftLabel}</span>

      <div
        className={classNames(styles.switch, styles[`switch_${currentTheme}`])}>
        <div
          className={classNames(
            styles.indicator,
            styles[`indicator_${currentTheme}`],
            {
              [styles.indicator_checked]: internalIsChecked,
            },
          )}
        />
      </div>

      <span className={styles.label}>{rightLabel}</span>
    </div>
  );
}

Switch.propTypes = {
  isChecked: PropTypes.bool,
  leftLabel: PropTypes.string,
  rightLabel: PropTypes.string,
  onChange: PropTypes.func,
};

Switch.defaultProps = {
  isChecked: false,
  leftLabel: "",
  rightLabel: "",
  onChange: () => {},
};

export default Switch;
