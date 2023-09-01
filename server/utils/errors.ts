import { ValidationError } from "express-validator";

export const errorSort = (errMapped: Record<string, ValidationError>) => {
  return Object.keys(errMapped).reduce(
    (acc: { [key: string]: string }, error) => {
      return { ...acc, [error]: errMapped[error].msg };
    },
    {}
  );
};
