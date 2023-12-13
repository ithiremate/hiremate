/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useState, useRef } from "react";
import classNames from "classnames";

import useClickOutside from "../../../hooks/useClickOutside";

import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function Select({
  label,
  placeholder,
  options,
  value,
  valueKey,
  isRequired,
  onChange,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [isExpanded, setIsExpanded] = useState(false);

  const clickOutsideRef = useRef(null);

  const toggleOptions = () => setIsExpanded((prev) => !prev);

  const handleChange = (option) => () => {
    setIsExpanded(false);
    onChange({ value: option, valueKey });
  };

  useClickOutside(clickOutsideRef, () => setIsExpanded(false));

  return (
    <div ref={clickOutsideRef} className={styles.container}>
      <span
        className={classNames(styles.label, styles[`label_${currentTheme}`])}
        onClick={() => setIsExpanded(true)}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </span>

      <div className={styles.fieldContainer}>
        <div
          className={classNames(styles.field, styles[`field_${currentTheme}`])}
          onClick={toggleOptions}>
          <span
            className={classNames(styles.value, {
              [styles.placeholder]: !value.value,
              [styles[`placeholder_${currentTheme}`]]: !value.value,
            })}>
            {value.label || placeholder}
          </span>

          <SvgIcon
            type="chevron"
            className={classNames(styles.arrow, {
              [styles.arrow_expanded]: isExpanded,
            })}
          />
        </div>

        <div
          className={classNames(
            styles.options,
            styles[`options_${currentTheme}`],
            {
              [styles.options_expanded]: isExpanded,
            },
          )}>
          {options.map((option) => {
            const isChosen = option.value === value.value;

            return (
              <div
                key={option.value}
                className={classNames(
                  styles.option,
                  styles[`option_${currentTheme}`],
                  { [styles[`option_${currentTheme}_chosen`]]: isChosen },
                )}
                onClick={handleChange(option)}>
                <span>{option.label}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

Select.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    }),
  ),
  value: PropTypes.shape({
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
  }),
  valueKey: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
};

Select.defaultProps = {
  label: "",
  placeholder: "",
  options: [{ value: "", label: "" }],
  value: { value: "", label: "" },
  valueKey: "",
  isRequired: false,
  onChange: () => {},
};

export default Select;
