import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import useNavigationRoutes from "./hooks/useNavigationRoutes";
import { ROOT } from "./utils/constants/routes";

function Navigation() {
  const navigationRoutes = useNavigationRoutes();

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

        <Route path="*" element={<Navigate to={ROOT} />} />
      </Routes>
    </Router>
  );
}

export default Navigation;
