import PropTypes from "prop-types";

import FORM from "../../../utils/constants/form";

import PostJobForm from "./forms/PostJobForm";
import SignInForm from "./forms/SignInForm";
import SignUpForm from "./forms/SignUpForm";
import CustomerWizardForm from "./forms/CustomerWizardForm";
import TalentWizardForm from "./forms/TalentWizardForm";

const FORMS_BY_TYPE = {
  [FORM.FORM_TYPES.POST_JOB]: PostJobForm,
  [FORM.FORM_TYPES.SIGN_IN]: SignInForm,
  [FORM.FORM_TYPES.SIGN_UP]: SignUpForm,
  [FORM.FORM_TYPES.CUSTOMER_WIZARD]: CustomerWizardForm,
  [FORM.FORM_TYPES.TALENT_WIZARD]: TalentWizardForm,
};

function Form({ type }) {
  const Component = FORMS_BY_TYPE[type];

  return <Component />;
}

Form.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Form;
