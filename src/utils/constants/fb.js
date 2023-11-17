const ERRORS = {
  "auth/invalid-login-credentials": "Invalid credentials",
  "auth/too-many-requests": "Too many requests",
  "auth/email-already-in-use": "Email already in use",
  "auth/user-disabled": "User disabled",
  default: "Something went wrong",
};

const COLLECTION_TYPES = {
  USERS: "users",
};

const USER_TYPES = {
  CUSTOMER: "customer",
  TALENT: "talent",
};

const USER_CONNECTION_STATUSES = {
  ONLINE: "online",
  OFFLINE: "offline",
};

const FB = { ERRORS, COLLECTION_TYPES, USER_TYPES, USER_CONNECTION_STATUSES };

export default FB;
