/* eslint-disable jsx-a11y/label-has-associated-control */
import { Fragment, useMemo } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";

function InputGroup({ addon, label, isRequired, className, onChange, inputs }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const inputsCount = useMemo(() => Object.keys(inputs).length, []);

  const isError = useMemo(
    () => Object.values(inputs).some((input) => !!input.errorMessage),
    [inputs],
  );

  const handleChange = (valueKey) => (e) => {
    onChange({ value: e.target.value, valueKey });
  };

  return (
    <div className={classNames(styles.container, className)}>
      <label
        className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </label>

      <div className={styles.fieldsContainer}>
        {Object.entries(inputs).map(([inputKey, input], index) => {
          const { placeholder, value, errorMessage, type } = input;

          return (
            <Fragment key={inputKey}>
              {index > 0 && (
                <div
                  className={classNames(
                    styles.addon,
                    styles[`addon_${currentTheme}`],
                    { [styles[`addon_${currentTheme}_error`]]: isError },
                  )}>
                  <span>{addon}</span>
                </div>
              )}

              <div className={styles.fieldContainer}>
                <input
                  className={classNames(
                    styles.field,
                    styles[`field_${currentTheme}`],
                    {
                      [styles[`field_${currentTheme}_first`]]: index === 0,
                      [styles[`field_${currentTheme}_last`]]:
                        index === inputsCount - 1,
                      [styles[`field_error_${currentTheme}`]]: !!errorMessage,
                    },
                  )}
                  placeholder={placeholder}
                  value={value}
                  name={inputKey}
                  type={type}
                  onChange={handleChange(inputKey)}
                />

                <span
                  className={classNames(
                    styles.errorMessage,
                    styles[`errorMessage_${currentTheme}`],
                  )}>
                  {errorMessage}
                </span>
              </div>
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

InputGroup.propTypes = {
  addon: PropTypes.string,
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  inputs: PropTypes.shape({
    placeholder: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    valueKey: PropTypes.string,
    errorMessage: PropTypes.string,
    name: PropTypes.string,
    type: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number,
  }),
};

InputGroup.defaultProps = {
  addon: "",
  label: "",
  isRequired: false,
  className: "",
  onChange: () => {},
  inputs: {
    placeholder: "",
    value: "",
    valueKey: "",
    errorMessage: "",
    name: "",
    type: "text",
    min: 0,
    max: 100,
  },
};

export default InputGroup;
