import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import useCurrentRoutes from "./hooks/useCurrentRoutes";
import { ROOT } from "./utils/constants/routes";

function Navigation() {
  const currentRoutes = useCurrentRoutes();

  return (
    <Router>
      <Routes>
        {Object.keys(currentRoutes).map((routeKey) => {
          const { element: Element, layout: Layout } = currentRoutes[routeKey];

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
