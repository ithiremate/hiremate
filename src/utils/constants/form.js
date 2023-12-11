import POST_JOB_CONSTANTS from "./postJob";

const FORM_TYPES = {
  SIGN_IN: "SIGN_IN",
  SIGN_UP: "SIGN_UP",
  POST_JOB: "POST_JOB",
  CUSTOMER_WIZARD: "CUSTOMER_WIZARD",
  TALENT_WIZARD: "TALENT_WIZARD",
};

const FIELD_TYPES = {
  INPUT: "INPUT",
  LOCATION: "LOCATION",
  SKILLS: "SKILLS",
  INPUT_GROUP: "INPUT_GROUP",
  CHECKBOX_GROUP: "CHECKBOX_GROUP",
  TEXT_AREA: "TEXT_AREA",
  CHECKBOX: "CHECKBOX",
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
    type: FIELD_TYPES.LOCATION,
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
    type: FIELD_TYPES.LOCATION,
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

const POST_JOB = {
  jobTitle: {
    value: "",
    errorMessage: "",
    label: "Title",
    placeholder: "Job Title",
    isRequired: true,
    type: FIELD_TYPES.INPUT,
  },
  location: {
    value: { display_name: "" },
    displayKey: "display_name",
    errorMessage: "",
    label: "Location",
    placeholder: "Job Location",
    isRequired: true,
    type: FIELD_TYPES.LOCATION,
  },
  contactPerson: {
    value: "",
    label: "Contact Person",
    placeholder: "Contact Person",
    type: FIELD_TYPES.INPUT,
  },
  contactPhone: {
    value: "",
    label: "Contact Phone",
    placeholder: "Contact Phone",
    type: FIELD_TYPES.INPUT,
  },
  additionalContact: {
    value: "",
    label: "Additional Contact",
    placeholder: "Additional Contact: skype, telegram etc.",
    type: FIELD_TYPES.INPUT,
  },
  skills: {
    value: { name: "" },
    chosen: [],
    displayKey: "name",
    errorMessage: "",
    label: "Skills / Requirements",
    placeholder: "Skills and Requirements",
    isRequired: true,
    isMultiple: true,
    type: FIELD_TYPES.SKILLS,
  },
  experience: {
    label: "Experience",
    addon: "to",
    isRequired: true,
    type: FIELD_TYPES.INPUT_GROUP,
    inputs: {
      experienceFrom: {
        placeholder: "Experience from",
        value: "",
        errorMessage: "",
        type: "number",
      },
      experienceTo: {
        placeholder: "Experience to",
        value: "",
        errorMessage: "",
        type: "number",
      },
    },
  },
  salary: {
    label: "Salary",
    addon: "to",
    isRequired: true,
    type: FIELD_TYPES.INPUT_GROUP,
    inputs: {
      salaryFrom: {
        placeholder: "Salary from",
        value: "",
        errorMessage: "",
        type: "number",
      },
      salaryTo: {
        placeholder: "Salary to",
        value: "",
        errorMessage: "",
        type: "number",
      },
    },
  },
  employmentType: {
    label: "Type of employment",
    errorMessage: "",
    type: FIELD_TYPES.CHECKBOX_GROUP,
    inputs: {
      [POST_JOB_CONSTANTS.EMPLOYMENT_TYPES.FULL_TIME]: {
        label: "Full-time",
        isChecked: false,
      },
      [POST_JOB_CONSTANTS.EMPLOYMENT_TYPES.PART_TIME]: {
        label: "Part-time",
        isChecked: false,
      },
      [POST_JOB_CONSTANTS.EMPLOYMENT_TYPES.PROJECT]: {
        label: "Project",
        isChecked: false,
      },
    },
  },
  workNature: {
    label: "Nature of work",
    errorMessage: "",
    type: FIELD_TYPES.CHECKBOX_GROUP,
    inputs: {
      [POST_JOB_CONSTANTS.WORK_NATURE_TYPES.ON_SITE]: {
        label: "On-site",
        isChecked: false,
      },
      [POST_JOB_CONSTANTS.WORK_NATURE_TYPES.REMOTE]: {
        label: "Remote",
        isChecked: false,
      },
      [POST_JOB_CONSTANTS.WORK_NATURE_TYPES.HYBRID]: {
        label: "Hybrid",
        isChecked: false,
      },
    },
  },
  description: {
    label: "Description",
    placeholder: "Job Description",
    value: "",
    errorMessage: "",
    isRequired: true,
    type: FIELD_TYPES.TEXT_AREA,
  },
  isDraft: {
    label: "Save as draft?",
    isChecked: false,
    type: FIELD_TYPES.CHECKBOX,
  },
};

const FORM = {
  FORM_TYPES,
  FIELD_TYPES,
  SIGN_IN,
  SIGN_UP,
  CUSTOMER_WIZARD,
  TALENT_WIZARD,
  POST_JOB,
};

export default FORM;
