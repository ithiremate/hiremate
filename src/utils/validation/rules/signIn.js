const signInRules = {
  email: ["required", "trim", "email"],
  password: ["required", "trim", "string", { min_length: 6 }],
};

export default signInRules;
