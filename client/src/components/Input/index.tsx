import { v4 as uuid } from "uuid";

import {
  useState,
  useEffect,
  ChangeEvent,
  FocusEvent,
  CSSProperties,
} from "react";

import "./style.scss";

interface Props {
  type?: string;
  label?: string;
  name?: string;
  placeholder?: string;
  isTextarea?: boolean;
  isDatePicker?: boolean;
  floatingLabel?: boolean;
  isOptional?: boolean;
  classNames?: string;
  style?: CSSProperties;
  value?: string;
  error?: string;
  readOnly?: boolean;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleFocus?: (e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleClick?: () => void;
}

const Input = ({
  type = "text",
  label,
  name,
  placeholder,
  readOnly = false,
  isTextarea = false,
  isDatePicker = false,
  isOptional = false,
  floatingLabel = false,
  style,
  classNames,
  value,
  error,
  handleChange,
  handleFocus,
  handleClick,
}: Props) => {
  const Component: any = isTextarea ? "textarea" : "input";

  const id = uuid();

  const [labelFloated, setLabelFloated] = useState<boolean>(false);

  useEffect(() => {
    if (value && floatingLabel && !labelFloated) setLabelFloated(true);
  }, [value, floatingLabel, labelFloated]);

  const handleInputClick = () => setLabelFloated(true);

  const handleFocusAndClick = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    handleFocus && handleFocus(e);
    floatingLabel && handleInputClick();
  };

  const handleBlur = () => {
    if (labelFloated && !value) setLabelFloated(false);
  };

  return (
    <div
      className={`input ${floatingLabel ? "floating-label" : ""} ${
        classNames || ""
      }`}
      onClick={handleClick || undefined}
    >
      <label
        htmlFor={`input-${id}`}
        className={`${isTextarea ? "textarea-label" : ""} ${
          labelFloated ? "input__label-floated" : ""
        }`}
      >
        {label}
        {isOptional ? <span>(optional)</span> : null}
      </label>
      {error ? (
        <div className="input__error">
          <span>{error}</span>
        </div>
      ) : null}
      <Component
        type={type}
        name={name}
        readOnly={readOnly}
        id={`input-${id}`}
        style={{ ...style }}
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        onFocus={handleFocusAndClick}
        onBlur={() => (floatingLabel ? handleBlur() : false)}
      />
    </div>
  );
};

export default Input;
