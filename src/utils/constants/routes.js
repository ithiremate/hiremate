// PUBLIC ROUTES
export const ROOT = "/";
export const SIGN_IN = `${ROOT}sign-in`;
export const SIGN_UP = `${ROOT}sign-up`;

// CUSTOMER ROUTES
export const JOBS = `${ROOT}jobs/:jobStatus`;
export const JOBS_ALL = `/jobs/all`;
export const JOBS_NEW = `/jobs/new`;
export const JOBS_ACTIVE = `/jobs/active`;
export const JOBS_PENDING = `/jobs/pending`;
export const JOBS_CLOSED = `/jobs/closed`;
export const JOBS_OFFER_EXTENDED = `/jobs/offer-extended`;
export const JOBS_OFFER_ACCEPTED = `/jobs/offer-accepted`;
export const JOBS_OFFER_DECLINED = `/jobs/offer-declined`;
export const JOBS_ON_HOLD = `/jobs/on-hold`;
export const JOBS_ARCHIVED = `/jobs/archived`;

// CUSTOMER SIDE MENU
export const CUSTOMER_SIDE_MENU = {
  [ROOT]: {
    title: "Dashboard",
    icon: "grid",
  },
  [JOBS]: {
    title: "Jobs",
    icon: "case",
    nested: {
      [JOBS_ALL]: {
        title: "All Jobs",
      },
      [JOBS_NEW]: {
        title: "Post New Job",
      },
    },
  },
};
