import { ValidationError } from "class-validator";

export const formatFieldsValidationError = (errors: ValidationError[]) => {
  const formattedErrors = errors.map((error) => {
    const messages = Object.values(error.constraints!);

    return {
      field: error.property,
      messages,
    };
  });

  return formattedErrors;
};
