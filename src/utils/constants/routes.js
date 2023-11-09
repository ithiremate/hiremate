// LAYOUTS
import AuthLayout from "../../components/layouts/AuthLayout";

// PUBLIC PAGES
import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";

// PUBLIC ROUTES
const ROOT = "/";
const SIGN_IN = `${ROOT}sign-in`;
const SIGN_UP = `${ROOT}sign-up`;

const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};

const routes = { publicRoutes: PUBLIC_ROUTES, ROOT, SIGN_IN, SIGN_UP };

export default routes;
