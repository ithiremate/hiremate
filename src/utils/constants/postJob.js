const EMPLOYMENT_TYPES = {
  FULL_TIME: "fullTime",
  PART_TIME: "partTime",
  PROJECT: "project",
};

const WORK_NATURE_TYPES = {
  ON_SITE: "onSite",
  REMOTE: "remote",
  HYBRID: "hybrid",
};

const WORK_NATURE_TITLES = {
  [WORK_NATURE_TYPES.ON_SITE]: "On-Site",
  [WORK_NATURE_TYPES.REMOTE]: "Remote",
  [WORK_NATURE_TYPES.HYBRID]: "Hybrid",
};

const ACTION_TYPES = {
  PUBLISH: "PUBLISH",
  EDIT: "EDIT",
};

const STATUS_TYPES = {
  PUBLISHED: "PUBLISHED",
  DRAFT: "DRAFT",
  ARCHIVED: "ARCHIVED",
};

const DEFAULT_FORM_FIELDS = {
  title: { value: "", errorMessage: "" },
  location: { value: { display_name: "" }, errorMessage: "" },
  skills: { value: { name: "" }, chosen: [], errorMessage: "" },
  experienceFrom: { value: "", errorMessage: "" },
  experienceTo: { value: "", errorMessage: "" },
  salaryFrom: { value: "", errorMessage: "" },
  salaryTo: { value: "", errorMessage: "" },
  description: { value: "", errorMessage: "" },
  isDraft: { value: false },
  employmentType: {
    [EMPLOYMENT_TYPES.FULL_TIME]: false,
    [EMPLOYMENT_TYPES.PART_TIME]: false,
    [EMPLOYMENT_TYPES.PROJECT]: false,
    errorMessage: "",
  },
  workNature: {
    [WORK_NATURE_TYPES.ON_SITE]: false,
    [WORK_NATURE_TYPES.REMOTE]: false,
    [WORK_NATURE_TYPES.HYBRID]: false,
    errorMessage: "",
  },
};

const POST_JOB = {
  EMPLOYMENT_TYPES,
  WORK_NATURE_TYPES,
  WORK_NATURE_TITLES,
  DEFAULT_FORM_FIELDS,
  ACTION_TYPES,
  STATUS_TYPES,
};

export default POST_JOB;
