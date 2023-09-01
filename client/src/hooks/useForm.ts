import { useState, useEffect, ChangeEvent, FocusEvent } from "react";

import { departments } from "../features/products/constants";

const rules: { [key: string]: any } = {
  // Rules for all possible fields of various forms
  name: {
    min: 2,
    max: 40,
  },
  price: {
    number: true,
  },
  description: {
    min: 50,
    max: 3000,
  },
  message: {
    min: 50,
    max: 3000,
  },
  email: {
    filter: new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/),
  },
  phone: {
    filter: new RegExp(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/),
  },
  guests: {
    number: true,
    min: 1,
    max: 3,
  },
  department: {
    select: departments,
  },
  password: {
    min: 7,
    max: 16,
  },
  location: {
    min: 3,
    max: 150,
  },
};

const useForm = ({
  initialValue,
  isSuccess,
  closeModal,
  requiredFields,
}: {
  initialValue: any;
  isSuccess?: boolean;
  closeModal?: () => void;
  requiredFields?: string[];
}) => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(initialValue);

  const validate = () => {
    const errorsTemp: { [key: string]: string } = Object.keys(
      initialValue
    ).reduce((result, key) => {
      return { ...result, [key]: "" };
    }, {});

    Object.keys(value).forEach((key: string) => {
      const valRules = rules[key];

      if (!requiredFields?.includes(key) && !value[key]) {
        // for some fields value is not required, if there's still a value for a field that is not required - rules apply to that field as well as to required fields, but if a field is not requried and the value for that field is absent, validation to that field will be skipped
        return null;
      }

      if (valRules) {
        // checking if that field isreqiured to be filled
        if (valRules.min && value[key].length < valRules.min) {
          errorsTemp[
            key
          ] = `This field must contain at least ${valRules.min} characters`;
        }

        if (valRules.max && value[key].length > valRules.max) {
          errorsTemp[
            key
          ] = `This field must contain at most ${valRules.max} characters`;
        }

        if (valRules.number && isNaN(value[key])) {
          errorsTemp[key] = "This field must contain numeric characters";
        }

        if (valRules.filter && !valRules.filter.test(value[key])) {
          errorsTemp[key] = "Incorrect format";
        }

        if (
          valRules.select &&
          !valRules.select.find((elem: string) => elem !== value[key])
        ) {
          errorsTemp[key] = "Choose one of the options";
        }
      }

      if (requiredFields?.includes(key) && !value[key]) {
        errorsTemp[key] =
          key === "department"
            ? "Choose a department the product belongs to"
            : "This field can't be empty";
      }
    });

    if (Object.values(errorsTemp).some((value) => !!value)) {
      setError({ ...error, ...errorsTemp });
      return false;
    } else {
      return true;
    }
  };

  useEffect(() => {
    if (isSuccess) {
      closeModal && closeModal();
      setValue(initialValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;
    const currentValue = e.target.value;

    if (rules[name]) {
      if (rules[name].number && isNaN(+currentValue)) {
        return setValue({ ...value, price: currentValue.replace(/\D/g, "") });
      }
    }

    if (name === "date") return;

    setValue(
      name === "image"
        ? { ...value, image: (e.target as HTMLInputElement).files![0] }
        : { ...value, [name]: currentValue }
    );
  };

  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    if (error[name]) setError({ ...error, [name]: "" });
  };

  const handleSubmitWrap = (submitFc: () => void) => {
    if (!validate()) return null;

    submitFc();
  };

  return {
    value,
    setValue,
    error,
    validate,
    handleChange,
    handleFocus,
    handleSubmitWrap,
  };
};

export default useForm;
