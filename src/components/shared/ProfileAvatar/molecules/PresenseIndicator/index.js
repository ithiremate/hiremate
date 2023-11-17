import PropTypes from "prop-types";
import classNames from "classnames";

import styles from "./index.module.scss";

function PresenseIndicator({ presenseStatus, currentTheme }) {
  return (
    <div
      className={classNames(
        styles.container,
        styles[`container_${currentTheme}`],
      )}>
      <div
        className={classNames(
          styles.indicator,
          styles[`indicator_${presenseStatus}_${currentTheme}`],
        )}
      />
    </div>
  );
}

PresenseIndicator.propTypes = {
  presenseStatus: PropTypes.string.isRequired,
  currentTheme: PropTypes.string.isRequired,
};

export default PresenseIndicator;
