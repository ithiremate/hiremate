import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import SvgButton from "../SvgButton";

import styles from "./index.module.scss";

function Input({
  label,
  placeholder,
  value,
  valueKey,
  name,
  type,
  errorMessage,
  showErrorMessage,
  labelButton,
  isRequired,
  readOnly,
  secured,
  className,
  onChange,
  onFocus,
  onLabelButtonClick,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [inputType, setInputType] = useState(secured ? "password" : type);

  const id = nanoid();

  const handleChange = (e) => {
    onChange({ value: e.target.value, valueKey });
  };

  const handleIconClick = () => {
    const nextInputType = inputType === "password" ? type : "password";

    setInputType(nextInputType);
  };

  return (
    <div className={classNames(styles.container, className)}>
      <div className={styles.labelContainer}>
        <label
          htmlFor={id}
          className={classNames(styles.label, styles[`label_${currentTheme}`])}>
          {label}
          {isRequired && (
            <span className={styles[`asterisk_${currentTheme}`]}>*</span>
          )}
        </label>

        {labelButton && (
          <SvgButton icon={labelButton} onClick={onLabelButtonClick} />
        )}
      </div>

      <div className={styles.fieldContainer}>
        <input
          id={id}
          type={inputType}
          className={classNames(styles.field, styles[`field_${currentTheme}`], {
            [styles[`field_error_${currentTheme}`]]: !!errorMessage,
            [styles.field_with_icon]: secured,
          })}
          placeholder={placeholder}
          value={value}
          name={name}
          readOnly={readOnly}
          autoComplete={secured ? "off" : "on"}
          onChange={handleChange}
          onFocus={onFocus}
        />

        {secured && (
          <SvgButton
            className={styles.icon}
            icon={inputType === "password" ? "lock" : "unlock"}
            onClick={handleIconClick}
          />
        )}
      </div>

      {showErrorMessage && (
        <span
          className={classNames(
            styles.errorMessage,
            styles[`errorMessage_${currentTheme}`],
          )}>
          {errorMessage}
        </span>
      )}
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
  errorMessage: PropTypes.string,
  showErrorMessage: PropTypes.bool,
  labelButton: PropTypes.string,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  secured: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onLabelButtonClick: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  name: "",
  type: "text",
  errorMessage: "",
  showErrorMessage: true,
  labelButton: "",
  isRequired: false,
  readOnly: false,
  secured: false,
  className: "",
  onChange: () => {},
  onFocus: () => {},
  onLabelButtonClick: () => {},
};

export default Input;
