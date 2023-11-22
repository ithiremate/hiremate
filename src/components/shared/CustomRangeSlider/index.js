/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { RangeSlider } from "rsuite";

import styles from "./index.module.scss";

function CustomRangeSlider({
  label,
  value,
  valueKey,
  errorMessage,
  isRequired,
  onChange,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue) => {
    setInternalValue(newValue);
    onChange({ value: newValue, valueKey });
  };

  return (
    <div className={styles.container}>
      <label
        className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </label>

      <div className={styles.sliderContainer}>
        <RangeSlider
          className={styles[`slider_${currentTheme}`]}
          barClassName={styles.bar}
          handleClassName={styles.handle}
          value={internalValue}
          defaultValue={internalValue}
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
    </div>
  );
}

CustomRangeSlider.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  valueKey: PropTypes.string,
  errorMessage: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomRangeSlider.defaultProps = {
  label: "",
  value: [0, 100],
  valueKey: "",
  errorMessage: "",
  isRequired: false,
  onChange: () => {},
};

export default CustomRangeSlider;
