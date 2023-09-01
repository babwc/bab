import { useState } from "react";

export type DynamicObj = { [key: string]: string };

const useServerError = () => {
  const [serverError, setServerError] = useState<null | string | DynamicObj>(
    null
  );

  const handleServerError = (error: unknown) => {
    if (typeof error === "object" && error != null && "data" in error) {
      if (typeof error.data === "string") {
        setServerError(error.data as string);
      } else if (typeof error.data === "object") {
        setServerError({ ...error.data });
      }
    }
  };

  return { serverError, handleServerError };
};

export default useServerError;
