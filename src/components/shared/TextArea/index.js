import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import styles from "./index.module.scss";

function TextArea({
  label,
  placeholder,
  value,
  valueKey,
  name,
  errorMessage,
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

      <textarea
        id={id}
        className={classNames(styles.field, styles[`field_${currentTheme}`], {
          [styles[`field_error_${currentTheme}`]]: !!errorMessage,
        })}
        placeholder={placeholder}
        value={value}
        name={name}
        rows={10}
        readOnly={readOnly}
        onChange={handleChange}
      />

      <span
        className={classNames(
          styles.errorMessage,
          styles[`errorMessage_${currentTheme}`],
        )}>
        {errorMessage}
      </span>
    </div>
  );
}

TextArea.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
};

TextArea.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  name: "",
  errorMessage: "",
  isRequired: false,
  readOnly: false,
  onChange: () => {},
};

export default TextArea;
