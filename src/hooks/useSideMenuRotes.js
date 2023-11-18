import { useMemo } from "react";
import { useSelector } from "react-redux";

import { CUSTOMER_SIDE_MENU } from "../utils/constants/routes";
import FB from "../utils/constants/fb";

function useSideMenuRoutes() {
  const { sessionUser } = useSelector((state) => state.session);
  const { dbUser } = useSelector((state) => state.user);

  const sideMenuRoutes = useMemo(() => {
    if (
      dbUser &&
      dbUser.wizardCompleted &&
      dbUser.userType === FB.USER_TYPES.CUSTOMER
    ) {
      return CUSTOMER_SIDE_MENU;
    }

    return {};
  }, [sessionUser, dbUser]);

  return sideMenuRoutes;
}

export default useSideMenuRoutes;
