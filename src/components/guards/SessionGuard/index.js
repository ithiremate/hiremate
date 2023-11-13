import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { subscribeOnSessionChanges } from "../../../store/actions/sessionActions";
import { subscribeOnUserChanges } from "../../../store/actions/userActions";

function SessionGuard({ children }) {
  const dispatch = useDispatch();
  const { isInitialized, sessionUser } = useSelector((state) => state.session);

  useEffect(() => {
    setTimeout(() => {
      dispatch(subscribeOnSessionChanges());
    }, 2000);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      (async () => {
        const { payload: unsubscribeUser } = await dispatch(
          subscribeOnUserChanges(),
        );

        return () => {
          unsubscribeUser();
        };
      })();
    }
  }, [isInitialized, sessionUser]);

  return children;
}

export default SessionGuard;
