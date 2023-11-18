import { useMemo } from "react";
import { useSelector } from "react-redux";

import router from "../utils/constants/router";
import FB from "../utils/constants/fb";

function useCurrentRoutes() {
  const { sessionUser } = useSelector((state) => state.session);
  const { dbUser } = useSelector((state) => state.user);

  const navigationRoutes = useMemo(() => {
    if (dbUser && !dbUser.wizardCompleted) {
      return router.wizard;
    }

    if (
      dbUser &&
      dbUser.wizardCompleted &&
      dbUser.userType === FB.USER_TYPES.CUSTOMER
    ) {
      return router.customer;
    }

    return router.public;
  }, [sessionUser, dbUser]);

  return navigationRoutes;
}

export default useCurrentRoutes;
