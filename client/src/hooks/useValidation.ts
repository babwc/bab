import { useState } from "react";
import isEmpty from "lodash.isempty";

const useValidation = ({ initialValue, exclude, findErrors }: any) => {
  const [error, setError] = useState<any>({ ...initialValue });

  const validate = (valueFinal: any) => {
    let errorTemp: any = {};

    errorTemp = findErrors(errorTemp); // since each form may have different fields with different purposes and different requierements, findErrors functions will contain its own separate validation

    const valueKeys = Object.keys(valueFinal);

    const filteredValue = exclude
      ? valueKeys.filter((elem: string) => {
          if (!exclude.includes(elem)) return elem;
        })
      : valueKeys;

    filteredValue.forEach((key: any) => {
      if (!valueFinal[key]) {
        errorTemp = { ...errorTemp, [key]: "This field can't be empty" };
      }
    });

    if (Object.values(errorTemp).find((error: any) => error)) {
      setError({ ...error, ...errorTemp });
      return false;
    } else {
      return true;
    }
  };

  return { error, setError, validate };
};

export default useValidation;
