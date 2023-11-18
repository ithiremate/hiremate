// LAYOUTS
import AuthLayout from "../../components/layouts/Auth";
import WizardLayout from "../../components/layouts/Wizard";
import MainLayout from "../../components/layouts/Main";

// PUBLIC PAGES
import SignIn from "../../components/pages/SignIn";
import SignUp from "../../components/pages/SignUp";

// WIZARD PAGES
import Wizard from "../../components/pages/Wizard";

// CUSTOMER PAGES
import Dashboard from "../../components/pages/customer/DashBoard";

// ROUTES
import { ROOT, SIGN_IN, SIGN_UP } from "./routes";

const PUBLIC_ROUTER = {
  [ROOT]: { element: SignIn, layout: AuthLayout },
  [SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [SIGN_UP]: { element: SignUp, layout: AuthLayout },
};

const WIZARD_ROUTER = {
  [ROOT]: { element: Wizard, layout: WizardLayout },
};

const CUSTOMER_ROUTER = {
  [ROOT]: { element: Dashboard, layout: MainLayout },
};

const router = {
  public: PUBLIC_ROUTER,
  wizard: WIZARD_ROUTER,
  customer: CUSTOMER_ROUTER,
};

export default router;
