/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import classNames from "classnames";
import { nanoid } from "@reduxjs/toolkit";

import useClickOutside from "../../../hooks/useClickOutside";

import LoadingIndicator from "../LoadingIndicator";
import SvgIcon from "../SvgIcon";

import styles from "./index.module.scss";

function SearchInput({
  label,
  placeholder,
  value,
  valueKey,
  displayKey,
  name,
  errorMessage,
  results,
  isRequired,
  isMultiple,
  isLoading,
  readOnly,
  onChange,
  onChose,
}) {
  const { currentTheme } = useSelector((state) => state.theme);

  const [internalValue, setInternalValue] = useState(value);
  const [internalResults, setInternalResults] = useState(results);
  const [isResultsVisible, setIsResultsVisible] = useState(false);
  const [chosenItems, setChosenItems] = useState([]);

  const id = nanoid();

  const resultsRef = useRef(null);
  const timeoutIdRef = useRef(null);

  const handleChange = (e) => {
    clearTimeout(timeoutIdRef.current);

    setInternalValue(e.target.value);

    timeoutIdRef.current = setTimeout(() => {
      onChange({ value: e.target.value, valueKey });
    }, 500);
  };

  const handleChose = (item) => () => {
    if (isMultiple) {
      const newChosenItems = [...chosenItems, item];

      setChosenItems(newChosenItems);
      onChose({ items: newChosenItems, value: item, valueKey });
    } else {
      onChose({ value: item, valueKey });
    }
  };

  const handleFocus = () => {
    if (!internalResults.length) {
      return;
    }

    setIsResultsVisible(true);
  };

  const handleClickOutside = () => {
    if (isLoading) {
      return;
    }

    setIsResultsVisible(false);
  };

  const handleRemoveChosen = (item) => () => {
    const newChosenItems = chosenItems.filter(
      (el) => el[displayKey] !== item[displayKey],
    );

    setChosenItems(newChosenItems);
    onChose({ items: newChosenItems, value: item, valueKey });
  };

  useClickOutside(resultsRef, handleClickOutside);

  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  useEffect(() => {
    if (isLoading) {
      setIsResultsVisible(true);
    }

    if (!isLoading && !results.length) {
      setIsResultsVisible(false);
    }
  }, [isLoading, results]);

  useEffect(() => {
    const chosenDisplayKeys = chosenItems.map((el) => el[displayKey]);
    const filteredResults = results.filter(
      (el) => !chosenDisplayKeys.includes(el[displayKey]),
    );

    setInternalResults(filteredResults);
  }, [results, chosenItems]);

  return (
    <div ref={resultsRef} className={styles.container}>
      <label
        htmlFor={id}
        className={classNames(styles.label, styles[`label_${currentTheme}`])}>
        {label}
        {isRequired && (
          <span className={styles[`asterisk_${currentTheme}`]}>*</span>
        )}
      </label>

      <div
        className={classNames(
          styles.fieldContainer,
          styles[`fieldContainer_${currentTheme}`],
          {
            [styles[`fieldContainer_error_${currentTheme}`]]: !!errorMessage,
          },
        )}>
        {isMultiple && !!chosenItems.length && (
          <div className={styles.chosenItems}>
            {chosenItems.map((chosen) => {
              return (
                <div
                  key={nanoid()}
                  className={classNames(
                    styles.chosenItem,
                    styles[`chosenItem_${currentTheme}`],
                  )}>
                  <p>{chosen[displayKey]}</p>

                  <SvgIcon
                    type="cross"
                    onClick={handleRemoveChosen(chosen)}
                    className={classNames(
                      styles.closeIcon,
                      styles[`closeIcon_${currentTheme}`],
                    )}
                  />
                </div>
              );
            })}
          </div>
        )}

        <input
          id={id}
          className={classNames(styles.field, styles[`field_${currentTheme}`])}
          placeholder={placeholder}
          value={internalValue}
          name={name}
          readOnly={readOnly}
          onChange={handleChange}
          onFocus={handleFocus}
        />

        <div
          className={classNames(
            styles.results,
            styles[`results_${currentTheme}`],
            {
              [styles.results_visible]: isResultsVisible,
            },
          )}>
          {isLoading ? (
            <LoadingIndicator
              width={24}
              height={24}
              className={styles.loader}
            />
          ) : (
            internalResults.map((item) => {
              return (
                <div
                  key={nanoid()}
                  onClick={handleChose(item)}
                  className={classNames(
                    styles.item,
                    styles[`item_${currentTheme}`],
                  )}>
                  <p>{item[displayKey]}</p>
                </div>
              );
            })
          )}
        </div>
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

SearchInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  displayKey: PropTypes.string,
  name: PropTypes.string,
  errorMessage: PropTypes.string,
  results: PropTypes.arrayOf(PropTypes.shape({})),
  isRequired: PropTypes.bool,
  isMultiple: PropTypes.bool,
  isLoading: PropTypes.bool,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func,
  onChose: PropTypes.func,
};

SearchInput.defaultProps = {
  label: "",
  placeholder: "",
  value: "",
  valueKey: "",
  displayKey: "",
  name: "",
  errorMessage: "",
  results: [],
  isRequired: false,
  isMultiple: false,
  isLoading: false,
  readOnly: false,
  onChange: () => {},
  onChose: () => {},
};

export default SearchInput;
