import { useSelector } from "react-redux";

import ThemeGuard from "../ThemeGuard";
import SessionGuard from "../SessionGuard";
import LoadingContainer from "../../containers/LoadingContainer";

function RootGuard({ children }) {
  const isAppInitialized = useSelector(
    (state) => !!state.theme.isInitialized && !!state.session.isInitialized,
  );

  return (
    <ThemeGuard>
      <SessionGuard>
        <LoadingContainer isLoading={!isAppInitialized}>
          {children}
        </LoadingContainer>
      </SessionGuard>
    </ThemeGuard>
  );
}

export default RootGuard;
