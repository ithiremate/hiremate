const MODAL_TYPES = {
  EDIT_JOB: "EDIT_JOB",
  DELETE_JOB: "DELETE_JOB",
};

const TITLES_BY_TYPE = {
  [MODAL_TYPES.EDIT_JOB]: "Edit Job",
  [MODAL_TYPES.DELETE_JOB]: "Delete Job",
};

const MODAL = { MODAL_TYPES, TITLES_BY_TYPE };

export default MODAL;
