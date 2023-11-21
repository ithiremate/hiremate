import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import FB from "../../../utils/constants/fb";
import { subscribeOnSessionChanges } from "../../../store/actions/sessionActions";
import { subscribeOnJobsChanges } from "../../../store/actions/jobsActions";

import {
  subscribeOnUserChanges,
  updateUserFieldInDb,
} from "../../../store/actions/userActions";

function SessionGuard({ children }) {
  const dispatch = useDispatch();
  const { isInitialized, sessionUser } = useSelector((state) => state.session);
  const { dbUser } = useSelector((state) => state.user);

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

        return unsubscribeUser;
      })();
    }
  }, [isInitialized, sessionUser]);

  useEffect(() => {
    if (isInitialized && dbUser && dbUser.userType === FB.USER_TYPES.CUSTOMER) {
      (async () => {
        const { payload: unsubscribeJobs } = await dispatch(
          subscribeOnJobsChanges(),
        );

        return unsubscribeJobs;
      })();
    }
  }, [isInitialized, dbUser]);

  useEffect(() => {
    const shouldUpdatePresenseStatus =
      dbUser && dbUser.presenseStatus !== FB.USER_CONNECTION_STATUSES.ONLINE;

    if (shouldUpdatePresenseStatus) {
      dispatch(
        updateUserFieldInDb({
          presenseStatus: FB.USER_CONNECTION_STATUSES.ONLINE,
        }),
      );
    }

    window.addEventListener("unload", () => {
      dispatch(
        updateUserFieldInDb({
          presenseStatus: FB.USER_CONNECTION_STATUSES.OFFLINE,
        }),
      );
    });

    return () => {
      window.removeEventListener("unload", () => {
        dispatch(
          updateUserFieldInDb({
            connectionStatus: FB.USER_CONNECTION_STATUSES.OFFLINE,
          }),
        );
      });
    };
  }, [dbUser]);

  return children;
}

export default SessionGuard;
