/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { RangeSlider } from "rsuite";

import InputGroup from "../InputGroup";

import styles from "./index.module.scss";

function CustomRangeSlider({
  label,
  value,
  valueKey,
  errorMessage,
  min,
  max,
  isRequired,
  onChange,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue) => {
    setInternalValue(newValue);
    onChange({ value: newValue, valueKey });
  };

  const handleInputChange = ({
    value: inputValue,
    valueKey: inputValueKey,
  }) => {
    const [start, end] = internalValue;

    switch (inputValueKey) {
      case "min": {
        if (+inputValue < min) {
          break;
        }

        handleChange([+inputValue, end]);

        break;
      }

      default: {
        if (+inputValue > max) {
          break;
        }

        handleChange([start, +inputValue]);

        break;
      }
    }
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
          className={classNames(
            styles.slider,
            styles[`slider_${currentTheme}`],
          )}
          barClassName={styles.bar}
          handleClassName={styles.handle}
          value={internalValue}
          defaultValue={value}
          min={min}
          max={max}
          onChange={handleChange}
        />

        <InputGroup
          addon="to"
          className={styles.inputs}
          onChange={handleInputChange}
          inputs={[
            {
              placeholder: "Min",
              value: internalValue[0],
              valueKey: "min",
              type: "number",
              min,
            },
            {
              placeholder: "Max",
              value: internalValue[1],
              valueKey: "max",
              type: "number",
              max,
            },
          ]}
        />
      </div>

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

CustomRangeSlider.propTypes = {
  label: PropTypes.string,
  value: PropTypes.arrayOf(PropTypes.number),
  valueKey: PropTypes.string,
  errorMessage: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
};

CustomRangeSlider.defaultProps = {
  label: "",
  value: [0, 100],
  valueKey: "",
  errorMessage: "",
  min: 0,
  max: 100,
  isRequired: false,
  onChange: () => {},
};

export default CustomRangeSlider;
