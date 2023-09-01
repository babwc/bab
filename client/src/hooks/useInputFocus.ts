import { Dispatch, SetStateAction, FocusEvent } from "react";

const useInputFocus = ({
  error,
  setError,
}: {
  error: any;
  setError: Dispatch<SetStateAction<any>>;
}) => {
  const handleFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name;

    if (error[name]) setError({ ...error, [name]: "" });
  };

  return { handleFocus };
};

export default useInputFocus;
