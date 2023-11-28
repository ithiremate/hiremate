import { useSelector } from "react-redux";

import ThemeGuard from "../ThemeGuard";
import SessionGuard from "../SessionGuard";
import EmsiSessionGuard from "../EmsiSessionGuard";
import LoadingContainer from "../../containers/LoadingContainer";

function RootGuard({ children }) {
  const isAppInitialized = useSelector(
    (state) =>
      !!state.theme.isInitialized &&
      !!state.session.isInitialized &&
      !!state.user.isInitialized,
  );

  return (
    <ThemeGuard>
      <SessionGuard>
        <EmsiSessionGuard>
          <LoadingContainer isLoading={!isAppInitialized} showLogo>
            {children}
          </LoadingContainer>
        </EmsiSessionGuard>
      </SessionGuard>
    </ThemeGuard>
  );
}

export default RootGuard;
