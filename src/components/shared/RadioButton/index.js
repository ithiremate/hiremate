/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import styles from "./index.module.scss";

function RadioButton({ label, isChecked, valueKey, onChange }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const id = nanoid();

  const handleChange = (value) => () => {
    onChange({ value, valueKey });
  };

  return (
    <div className={styles.container} onClick={handleChange(true)}>
      <input
        id={id}
        type="radio"
        checked={isChecked}
        className={classNames(styles.field, styles[`field_${currentTheme}`])}
        onChange={handleChange(true)}
      />

      {label && (
        <label
          htmlFor={id}
          className={classNames(styles.label, styles[`label_${currentTheme}`])}>
          {label}
        </label>
      )}
    </div>
  );
}

RadioButton.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  valueKey: PropTypes.string,
  onChange: PropTypes.func,
};

RadioButton.defaultProps = {
  label: "",
  isChecked: false,
  valueKey: "",
  onChange: () => {},
};

export default RadioButton;
