import PropTypes from "prop-types";

import FORM from "../../../utils/constants/form";

import PostJobForm from "./forms/PostJobForm";

const FORMS_BY_TYPE = {
  [FORM.FORM_TYPES.POST_JOB]: PostJobForm,
};

function Form({ type, data }) {
  const Component = FORMS_BY_TYPE[type];

  return <Component {...data} />;
}

Form.propTypes = {
  type: PropTypes.string,
  data: PropTypes.shape({}),
};

Form.defaultProps = {
  type: "",
  data: {},
};

export default Form;
