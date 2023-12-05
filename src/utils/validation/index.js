/* eslint-disable no-restricted-syntax */
/* eslint-disable no-use-before-define */
import LIVR from "livr";
import extraRules from "livr-extra-rules";

import {
  NOT_EQUAL_ERRORS,
  REQUIRED_ERRORS,
  TOO_SHORT_ERRORS,
  WRONG_FORMAT_ERRORS,
  CONTENT_ERRORS,
} from "./errors";

import rules from "./rules";

LIVR.Validator.registerDefaultRules(extraRules);
LIVR.Validator.defaultAutoTrim(true);

export function mapErrors(error) {
  const mapedErrors = {};

  error.errors?.forEach(
    (element) => (mapedErrors[element.field] = element.message),
  );

  return mapedErrors;
}

export function decodeErrorCode(code, field = "") {
  switch (code) {
    case "REQUIRED": {
      const errorMessage = field && REQUIRED_ERRORS[field];

      return errorMessage || "Value is required";
    }

    case "TOO_SHORT": {
      const errorMessage = field && TOO_SHORT_ERRORS[field];

      return errorMessage || "Value is too short";
    }

    case "WRONG_EMAIL": {
      return "A valid email is required.";
    }

    case "FIELDS_NOT_EQUAL": {
      const errorMessage = field && NOT_EQUAL_ERRORS[field];

      return errorMessage || "Value is invalid";
    }

    case "NOT_POSITIVE_INTEGER": {
      const errorMessage = field && WRONG_FORMAT_ERRORS[field];

      return errorMessage || "Value is invalid";
    }

    case "CANNOT_BE_EMPTY": {
      const errorMessage = field && CONTENT_ERRORS[field];

      return errorMessage || "Value is invalid";
    }

    default: {
      return code;
    }
  }
}

function decodeErrorObject(errors) {
  const decodedErrors = { ...errors };

  for (const field in decodedErrors) {
    if (Object.prototype.hasOwnProperty.call(decodedErrors, field)) {
      const errorField = field.replace("data/", "");

      decodedErrors[errorField] = decodeErrorCode(
        decodedErrors[field],
        errorField,
      );
    }
  }

  return decodedErrors;
}

function validate({ rule, data, onSuccess, onError }) {
  const validator = new LIVR.Validator(rule);
  const validData = validator.validate(data);

  if (validData) {
    if (onSuccess) onSuccess(validData);
  } else {
    const decodedErrors = decodeErrorObject(validator.getErrors());

    if (onError) {
      onError(decodedErrors);
    }
  }
}

export function validateSignIn(args) {
  return validate({ rule: rules.signIn, ...args });
}

export function validateSignUp(args) {
  return validate({ rule: rules.signUp, ...args });
}

export function validateCustomerWizard(args) {
  return validate({ rule: rules.customerWizard, ...args });
}

export function validateTalentWizard(args) {
  return validate({ rule: rules.talentWizard, ...args });
}

export function validatePostJob(args) {
  return validate({ rule: rules.postJob, ...args });
}
