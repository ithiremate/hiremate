/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

import { searchLocation } from "../../../store/actions/locationActions";

import Input from "../Input";
import LoadingIndicator from "../LoadingIndicator";

import styles from "./index.module.scss";

function LocationInput({
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

  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [chosenResult, setChosenResult] = useState(null);

  const timeoutRef = useRef(null);

  const handleInputChange = ({
    value: inputValue,
    valueKey: inputValueKey,
  }) => {
    setChosenResult(null);
    onChange({ value: inputValue, valueKey: inputValueKey });
  };

  const initSearch = () => {
    setIsLoading(true);

    let locations = [];

    setTimeout(async () => {
      locations = await searchLocation(value);

      setResults(locations);
      setIsLoading(false);
    }, 1000);
  };

  const handleLocationClick = (location) => () => {
    setChosenResult(location);
    setResults([]);
    onChange({ value: location.display_name, valueKey });
  };

  useEffect(() => {
    if (value && !chosenResult) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(initSearch, 500);
    } else {
      setResults([]);
    }
  }, [value]);

  return (
    <div className={styles.container}>
      <Input
        label={label}
        placeholder={placeholder}
        value={value}
        valueKey={valueKey}
        name={name}
        errorMessage={errorMessage}
        isRequired={isRequired}
        readOnly={readOnly}
        onChange={handleInputChange}
      />

      <div
        className={classNames(
          styles.results,
          styles[`results_${currentTheme}`],
          { [styles.results_loading]: isLoading },
          { [styles.results_visible]: isLoading || results.length },
        )}>
        {isLoading ? (
          <LoadingIndicator
            className={styles.loader}
            width={20}
            height={20}
            reverted
          />
        ) : (
          results.map((location) => {
            const { place_id, display_name } = location;

            return (
              <div
                key={place_id}
                onClick={handleLocationClick(location)}
                className={classNames(
                  styles.location,
                  styles[`location_${currentTheme}`],
                )}>
                <p className={styles.name}>{display_name}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

LocationInput.propTypes = {
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

LocationInput.defaultProps = {
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

export default LocationInput;
