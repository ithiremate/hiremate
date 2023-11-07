import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import styles from "./index.module.scss";

function Input({
  label,
  placeholder,
  value,
  valueKey,
  name,
  isValid,
  isRequired,
  readOnly,
  onChange,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const id = nanoid();

  const handleChange = (e) => {
    onChange({ value: e.target.value, valueKey });
  };

  return (
    <div className={styles.container}>
      <label
        htmlFor={id}
        className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </label>

      <input
        id={id}
        className={classNames(styles.field, styles[`field_${currentTheme}`], {
          [styles[`field_error_${currentTheme}`]]: !isValid,
        })}
        placeholder={placeholder}
        value={value}
        name={name}
        readOnly={readOnly}
        onChange={handleChange}
      />
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  name: PropTypes.string,
  isValid: PropTypes.bool,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  name: "",
  isValid: true,
  isRequired: false,
  readOnly: false,
  onChange: () => {},
};

export default Input;
