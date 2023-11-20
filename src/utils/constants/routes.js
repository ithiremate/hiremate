// PUBLIC ROUTES
export const ROOT = "/";
export const SIGN_IN = `${ROOT}sign-in`;
export const SIGN_UP = `${ROOT}sign-up`;

// CUSTOMER ROUTES
export const JOBS = `${ROOT}jobs/:jobStatus`;
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
    icon: "grid",
    nested: {
      [JOBS_ACTIVE]: {
        title: "Active Jobs",
      },
      [JOBS_PENDING]: {
        title: "Pending Jobs",
      },
      [JOBS_CLOSED]: {
        title: "Closed Jobs",
      },
      [JOBS_OFFER_EXTENDED]: {
        title: "Offer Extended",
      },
      [JOBS_OFFER_ACCEPTED]: {
        title: "Offer Accepted",
      },
      [JOBS_OFFER_DECLINED]: {
        title: "Offer Declined",
      },
      [JOBS_ON_HOLD]: {
        title: "On Hold",
      },
      [JOBS_ARCHIVED]: {
        title: "Archived Jobs",
      },
    },
  },
};
