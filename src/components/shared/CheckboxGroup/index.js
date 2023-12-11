import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";

import styles from "./index.module.scss";
import Checkbox from "../Checkbox";

function CheckboxGroup({
  label,
  isRequired,
  isError,
  errorMessage,
  onChange,
  inputs,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  return (
    <div className={styles.container}>
      <span
        className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </span>

      <div className={styles.inputs}>
        {Object.entries(inputs).map(([valueKey, input]) => {
          const { label: inputLabel, isChecked } = input;

          return (
            <Checkbox
              key={valueKey}
              label={inputLabel}
              isChecked={isChecked}
              isError={isError}
              onChange={() => onChange({ value: !isChecked, valueKey })}
            />
          );
        })}
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

CheckboxGroup.propTypes = {
  label: PropTypes.string,
  isRequired: PropTypes.bool,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
  onChange: PropTypes.func,
  inputs: PropTypes.shape({
    label: PropTypes.string,
    isChecked: PropTypes.bool,
    valueKey: PropTypes.string,
  }),
};

CheckboxGroup.defaultProps = {
  label: "",
  isRequired: false,
  isError: false,
  errorMessage: "",
  onChange: () => {},
  inputs: {
    label: "",
    isChecked: false,
    valueKey: "",
  },
};

export default CheckboxGroup;
