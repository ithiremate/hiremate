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
import Jobs from "../../components/pages/customer/Jobs";
import PostJob from "../../components/pages/customer/PostJob";
import EditJob from "../../components/pages/customer/EditJob";

// ROUTES
import * as routes from "./routes";

const PUBLIC_ROUTER = {
  [routes.ROOT]: { element: SignIn, layout: AuthLayout },
  [routes.SIGN_IN]: { element: SignIn, layout: AuthLayout },
  [routes.SIGN_UP]: { element: SignUp, layout: AuthLayout },
};

const WIZARD_ROUTER = {
  [routes.ROOT]: { element: Wizard, layout: WizardLayout },
};

const CUSTOMER_ROUTER = {
  [routes.ROOT]: { element: Dashboard, layout: MainLayout },
  [routes.JOBS]: { element: Jobs, layout: MainLayout },
  [routes.JOBS_ALL]: { element: Jobs, layout: MainLayout },
  [routes.JOBS_NEW]: { element: PostJob, layout: MainLayout },
  [routes.JOBS_EDIT]: { element: EditJob, layout: MainLayout },
};

const router = {
  public: PUBLIC_ROUTER,
  wizard: WIZARD_ROUTER,
  customer: CUSTOMER_ROUTER,
};

export default router;
