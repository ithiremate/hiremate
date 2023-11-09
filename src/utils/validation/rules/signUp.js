const signInRules = {
  email: ["required", "trim", "email"],
  password: ["required", "trim", "string", { min_length: 6 }],
  passwordConfirm: [
    "required",
    "trim",
    "string",
    { equal_to_field: "password" },
    { min_length: 6 },
  ],
};

export default signInRules;
