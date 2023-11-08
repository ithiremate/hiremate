import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import styles from "./index.module.scss";
import SvgButton from "../SvgButton";

function Input({
  label,
  placeholder,
  value,
  valueKey,
  name,
  type,
  isValid,
  isRequired,
  readOnly,
  secured,
  onChange,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const id = nanoid();
  const [inputType, setInputType] = useState(secured ? "password" : type);

  const handleChange = (e) => {
    onChange({ value: e.target.value, valueKey });
  };

  const handleIconClick = () => {
    const nextInputType = inputType === "password" ? type : "password";

    setInputType(nextInputType);
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

      <div className={styles.fieldContainer}>
        <input
          id={id}
          type={inputType}
          className={classNames(styles.field, styles[`field_${currentTheme}`], {
            [styles[`field_error_${currentTheme}`]]: !isValid,
            [styles.field_with_icon]: secured,
          })}
          placeholder={placeholder}
          value={value}
          name={name}
          readOnly={readOnly}
          autoComplete={secured ? "off" : "on"}
          onChange={handleChange}
        />

        {secured && (
          <SvgButton
            className={styles.icon}
            icon={inputType === "password" ? "unlock" : "lock"}
            onClick={handleIconClick}
          />
        )}
      </div>
    </div>
  );
}

Input.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  isValid: PropTypes.bool,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  secured: PropTypes.bool,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  name: "",
  type: "text",
  isValid: true,
  isRequired: false,
  readOnly: false,
  secured: false,
  onChange: () => {},
};

export default Input;
