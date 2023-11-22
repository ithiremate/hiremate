import { Fragment } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";

function InputGroup({ addon, className, onChange, inputs }) {
  const { currentTheme } = useSelector((state) => state.theme);

  const handleChange = (valueKey) => (e) => {
    onChange({ value: e.target.value, valueKey });
  };

  return (
    <div className={classNames(styles.container, className)}>
      {inputs.map((input, index) => {
        const { placeholder, value, valueKey, name, type, min, max } = input;

        return (
          <Fragment key={valueKey}>
            {index > 0 && (
              <div
                className={classNames(
                  styles.addon,
                  styles[`addon_${currentTheme}`],
                )}>
                <span>{addon}</span>
              </div>
            )}

            <input
              className={classNames(
                styles.field,
                styles[`field_${currentTheme}`],
              )}
              placeholder={placeholder}
              value={value}
              name={name}
              type={type}
              min={min}
              max={max}
              onChange={handleChange(valueKey)}
            />
          </Fragment>
        );
      })}
    </div>
  );
}

InputGroup.propTypes = {
  addon: PropTypes.string,
  className: PropTypes.string,
  onChange: PropTypes.func,
  inputs: PropTypes.arrayOf(
    PropTypes.shape({
      placeholder: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      valueKey: PropTypes.string,
      name: PropTypes.string,
      type: PropTypes.string,
      min: PropTypes.number,
      max: PropTypes.number,
    }),
  ),
};

InputGroup.defaultProps = {
  addon: "",
  className: "",
  onChange: () => {},
  inputs: [
    {
      placeholder: "",
      value: "",
      valueKey: "",
      name: "",
      type: "text",
      min: 0,
      max: 100,
    },
  ],
};

export default InputGroup;
