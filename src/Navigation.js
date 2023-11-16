import { useMemo } from "react";
import { useSelector } from "react-redux";
import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import routes from "./utils/constants/routes";

function Navigation() {
  const { sessionUser } = useSelector((state) => state.session);
  const { dbUser } = useSelector((state) => state.user);

  const navigationRoutes = useMemo(() => {
    if (dbUser && !dbUser.wizardCompleted) {
      return routes.wizard;
    }

    if (dbUser && dbUser.wizardCompleted) {
      return routes.private;
    }

    return routes.public;
  }, [sessionUser, dbUser]);

  return (
    <Router>
      <Routes>
        {Object.keys(navigationRoutes).map((routeKey) => {
          const { element: Element, layout: Layout } =
            navigationRoutes[routeKey];

          return (
            <Route
              key={routeKey}
              path={routeKey}
              element={
                <Layout>
                  <Element />
                </Layout>
              }
            />
          );
        })}

        <Route path="*" element={<Navigate to={routes.ROOT} />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
