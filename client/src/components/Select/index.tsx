import { useState, ReactNode } from "react";
import { v4 as uuid } from "uuid";

import AppearAnim from "../AppearAnim";

import { AiFillCaretDown } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

import "./style.scss";

interface Props<T> {
  title: string;
  isStatic?: boolean;
  isDisabled?: boolean;
  removable?: boolean;
  error?: string;
  options: {
    list: any;
    chosen: string;
  };
  handleOption?: (option: T) => void;
  handleRemove?: (option: string) => void;
  children?: ReactNode;
}

const Select = <T,>({
  title,
  isStatic = false,
  isDisabled = false,
  removable,
  options,
  error,
  handleOption,
  handleRemove,
  children,
}: Props<T>) => {
  const [listOpen, setListOpen] = useState<boolean>(false);
  console.log("options.list.length", options.list.length);
  console.log("litop");

  return (
    <div className="select">
      <div className="select__label">
        <h4>{title}</h4>
      </div>
      {error ? (
        <div className="input__error">
          <span>{error}</span>
        </div>
      ) : null}
      <div
        className={`select__field ${isDisabled && "disabled"}`}
        onClick={() => setListOpen(!listOpen)}
      >
        <span>{options.chosen || `Choose a ${title}`}</span>
        {!isDisabled ? (
          <div className="select__caret">
            <AiFillCaretDown size={20} />
          </div>
        ) : null}
      </div>
      {!isDisabled ? (
        <AppearAnim
          motionKey="select-list"
          inProp={listOpen}
          className={`select__options ${!isStatic ? "dynamic" : ""}`}
        >
          {options.list.length ? (
            <ul className="select__options__list">
              {options.list.map((option: any) => {
                return (
                  <li
                    key={uuid()}
                    onClick={
                      isStatic
                        ? undefined
                        : () => {
                            handleOption && handleOption(option);
                            setListOpen(false);
                          }
                    }
                  >
                    {option}
                    {removable ? (
                      <div
                        className="select__options__delete"
                        onClick={() => handleRemove && handleRemove(option)}
                      >
                        <MdDelete size={20} color={"#b30000"} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="select__options__empty">
              <h4>List is currently empty</h4>
            </div>
          )}
          {children}
        </AppearAnim>
      ) : null}
    </div>
  );
};

export default Select;
