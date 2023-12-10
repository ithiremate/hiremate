const FORM_TYPES = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  POST_JOB: "POST_JOB",
  CUSTOMER_WIZARD: "CUSTOMER_WIZARD",
  TALENT_WIZARD: "TALENT_WIZARD",
};

const FIELD_TYPES = {
  INPUT: "INPUT",
  SEARCH: "SEARCH",
};

const SIGN_IN = {
  email: {
    value: "",
    errorMessage: "",
    label: "Email",
    placeholder: "Email",
    isRequired: true,
  },
  password: {
    label: "Password",
    placeholder: "Password",
    value: "",
    errorMessage: "",
    isRequired: true,
    secured: true,
  },
};

const SIGN_UP = {
  email: {
    value: "",
    errorMessage: "",
    label: "Email",
    placeholder: "Email",
    isRequired: true,
  },
  password: {
    label: "Password",
    placeholder: "Password",
    value: "",
    errorMessage: "",
    isRequired: true,
    secured: true,
  },
  passwordConfirm: {
    label: "Confirm password",
    placeholder: "Confirm password",
    value: "",
    errorMessage: "",
    isRequired: true,
    secured: true,
  },
};

const CUSTOMER_WIZARD = {
  companyName: {
    value: "",
    errorMessage: "",
    label: "Company Name",
    placeholder: "Enter Company name",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
  location: {
    value: { display_name: "" },
    displayKey: "display_name",
    errorMessage: "",
    label: "Company Location",
    placeholder: "Enter Company location",
    isRequired: true,
    type: FIELD_TYPES.SEARCH,
  },
  username: {
    value: "",
    errorMessage: "",
    label: "Username",
    placeholder: "Enter Username",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
};

const TALENT_WIZARD = {
  firstName: {
    value: "",
    errorMessage: "",
    label: "First Name",
    placeholder: "Enter your first name",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
  surname: {
    value: "",
    errorMessage: "",
    label: "Surname",
    placeholder: "Enter your surname",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
  location: {
    value: { display_name: "" },
    displayKey: "display_name",
    errorMessage: "",
    label: "Company Location",
    placeholder: "Enter Company location",
    isRequired: true,
    type: FIELD_TYPES.SEARCH,
  },
  username: {
    value: "",
    errorMessage: "",
    label: "Username",
    placeholder: "Enter Username",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
};

const FORM = {
  FORM_TYPES,
  FIELD_TYPES,
  SIGN_IN,
  SIGN_UP,
  CUSTOMER_WIZARD,
  TALENT_WIZARD,
};

export default FORM;
