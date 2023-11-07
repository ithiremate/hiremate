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
      </label>

      <input
        id={id}
        className={classNames(styles.field, styles[`field_${currentTheme}`], {
          [styles[`field_error_${currentTheme}`]]: !isValid,
        })}
        placeholder={placeholder}
        value={value}
        name={name}
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
  onChange: PropTypes.func,
};

Input.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  name: "",
  isValid: true,
  onChange: () => {},
};

export default Input;
