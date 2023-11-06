// LAYOUTS
import AuthLayout from "../../components/layouts/AuthLayout";

// PUBLIC PAGES
import SignIn from "../../components/pages/SignIn";

// PUBLIC ROUTES
const ROOT = "/";
const SIGN_IN = `${ROOT}sign-in`;

const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
};

const routes = { publicRoutes: PUBLIC_ROUTES, ROOT };

export default routes;
