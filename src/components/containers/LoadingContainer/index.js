import PropTypes from "prop-types";

import Logo from "../../shared/Logo";
import LoadingIndicator from "../../shared/LoadingIndicator";

import styles from "./index.module.scss";

function LoadingContainer({ children, isLoading, showLogo }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        {showLogo && <Logo type="full" className={styles.logo} />}

        <LoadingIndicator />
      </div>
    );
  }

  return children;
}

LoadingContainer.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  showLogo: PropTypes.bool,
};

LoadingContainer.defaultProps = {
  showLogo: false,
};

export default LoadingContainer;
