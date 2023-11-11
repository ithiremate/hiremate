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
  const { user } = useSelector((state) => state.session);

  const navigationRoutes = useMemo(() => {
    if (user) {
      return routes.wizardRoutes;
    }

    return routes.publicRoutes;
  }, [user]);

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
