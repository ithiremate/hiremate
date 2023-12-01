import PropTypes from "prop-types";

import PostJobForm from "./molecules/PostJobForm";

const FORMS_BY_TYPE = {
  postJob: PostJobForm,
};

function Form({ type }) {
  const Component = FORMS_BY_TYPE[type];

  return <Component />;
}

Form.propTypes = {
  type: PropTypes.string,
};

Form.defaultProps = {
  type: "",
};

export default Form;
