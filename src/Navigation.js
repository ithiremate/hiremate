import {
  HashRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import routes from "./utils/constants/routes";

function Navigation() {
  return (
    <Router>
      <Routes>
        {Object.keys(routes.publicRoutes).map((routeKey) => {
          const { element: Element, layout: Layout } =
            routes.publicRoutes[routeKey];

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
