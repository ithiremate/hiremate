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

const FB = { ERRORS, COLLECTION_TYPES };

export default FB;
