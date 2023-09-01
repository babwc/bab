import { ChangeEvent, Dispatch, SetStateAction } from "react";

import "./InputAdditional.scss";

interface Props {
  label: string;
  value: any;
  name: string;
  setValue?: Dispatch<SetStateAction<any>>;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputError: string;
  readOnly?: boolean;
  handleClick?: () => void;
}

const InputAdditional = ({
  label,
  value,
  name,
  handleChange,
  inputError,
  readOnly = false,
  handleClick,
}: Props) => {
  return (
    <div className={`payment-additional ${inputError ? "error" : ""}`}>
      <label htmlFor={`payment-${label.toLowerCase().replace(/\s/g, "")}-id`}>
        {label}
      </label>

      <input
        id={`payment-${label.toLowerCase().replace(/\s/g, "")}-id`}
        value={value}
        name={name}
        readOnly={readOnly}
        style={{ cursor: readOnly ? "pointer" : "unset" }}
        onChange={handleChange}
        onClick={handleClick}
      />
      {inputError ? (
        <span className="payment-error-message">{inputError}</span>
      ) : (
        ""
      )}
    </div>
  );
};

export default InputAdditional;
