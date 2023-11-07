import PropTypes from "prop-types";

import Logo from "../../shared/Logo";
import LoadingIndicator from "../../shared/LoadingIndicator";

import styles from "./index.module.scss";

function LoadingContainer({ children, isLoading }) {
  if (isLoading) {
    return (
      <div className={styles.container}>
        <Logo type="full" className={styles.logo} />

        <LoadingIndicator />
      </div>
    );
  }

  return children;
}

LoadingContainer.propTypes = { isLoading: PropTypes.bool.isRequired };

export default LoadingContainer;
