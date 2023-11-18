// LAYOUTS
import AuthLayout from "../../components/layouts/Auth";
import WizardLayout from "../../components/layouts/Wizard";
import MainLayout from "../../components/layouts/Main";

// PUBLIC PAGES
import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";

// WIZARD PAGES
import Wizard from "../../components/pages/Wizard";

// PRIVATE PAGES
import Dashboard from "../../components/pages/DashBoard";

// ROUTES
import { ROOT, SIGN_IN, SIGN_UP } from "./routes";

const PUBLIC_ROUTES = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};

const WIZARD_ROUTES = {
  [ROOT]: { element: Wizard, layout: WizardLayout },
};

const PRIVATE_ROUTES = {
  [ROOT]: { element: Dashboard, layout: MainLayout },
};

const routes = {
  public: PUBLIC_ROUTES,
  wizard: WIZARD_ROUTES,
  private: PRIVATE_ROUTES,
};

export default routes;
