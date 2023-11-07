/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import LIVR from "livr";
import extraRules from "livr-extra-rules";

import rules from "./rules";

LIVR.Validator.registerDefaultRules(extraRules);
LIVR.Validator.defaultAutoTrim(true);

function validate({ rule, data, onSuccess, onError }) {
  const validator = new LIVR.Validator(rule);
  const validData = validator.validate(data);

  if (validData) {
    if (onSuccess) onSuccess(validData);
  } else {
    const decodedErrors = validator.getErrors();

    if (onError) {
      onError(decodedErrors);
    }
  }
}

export default function validateCreateSession(args) {
  return validate({ rule: rules.createSession, ...args });
}
