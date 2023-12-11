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

const POST_JOB = {
  EMPLOYMENT_TYPES,
  WORK_NATURE_TYPES,
  WORK_NATURE_TITLES,
  ACTION_TYPES,
  STATUS_TYPES,
};

export default POST_JOB;
