import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import classNames from "classnames";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function Checkbox({ label, isChecked, valueKey, errorMessage, onChange }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [value, setValue] = useState(isChecked);

  const id = nanoid();

  const handleChange = () => {
    setValue((prev) => !prev);
    onChange({ value: !isChecked, valueKey });
  };

  return (
    <div>
      <label
        htmlFor={id}
        className={classNames(styles.label, {
          [styles[`label_error_${currentTheme}`]]: errorMessage,
        })}>
        <SvgIcon type={value ? "checked" : "unchecked"} />
        {label}
      </label>

      <input
        id={id}
        type="checkbox"
        value={value}
        onChange={handleChange}
        hidden
      />
    </div>
  );
}

Checkbox.propTypes = {
  label: PropTypes.string,
  isChecked: PropTypes.bool,
  valueKey: PropTypes.string,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  label: "",
  isChecked: false,
  valueKey: "",
  errorMessage: "",
  onChange: () => {},
};

export default Checkbox;
