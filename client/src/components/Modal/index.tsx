import { FormEvent } from "react";

import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import Button from "../Button";

import "./style.scss";

interface Props {
  header?: string;
  includeFooter?: boolean;
  isForm?: boolean;
  confirmBtnTitle?: string;
  closeModal?: () => void;
  handleSubmit?: (e: FormEvent<HTMLFormElement>) => void;
  isModal?: boolean;
  cancelButton?: boolean;
  backdrop?: boolean;
  disabled?: boolean;
  children?: React.ReactNode;
}

const Modal = ({
  header,
  includeFooter = true,
  isForm = true,
  confirmBtnTitle,
  backdrop = true,
  cancelButton = true,
  isModal = true,
  closeModal,
  handleSubmit,
  disabled,
  children,
}: Props) => {
  const content = (
    <>
      {header ? (
        <div className="modal__header">
          <h3>{header}</h3>
        </div>
      ) : null}
      <div className="modal__body">{children}</div>
      {includeFooter ? (
        <div className="modal__footer">
          <div className="modal__footer__buttons">
            {cancelButton ? (
              <Button
                handleClick={closeModal}
                additionalStyle={{ backgroundColor: "#b30000" }}
              >
                Cancel
              </Button>
            ) : null}
            <Button
              additionalStyle={
                disabled
                  ? {
                      opacity: ".6",
                      cursor: "default",
                    }
                  : {}
              }
              disabled={disabled}
              isSubmit={isForm && !disabled}
            >
              {confirmBtnTitle}
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );

  const rootElement = document.querySelector("#modal");

  return rootElement
    ? ReactDOM.createPortal(
        <>
          {backdrop ? (
            <motion.div
              key={"backdrop"}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="backdrop"
              onClick={closeModal}
            ></motion.div>
          ) : null}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: "-50%", x: "-50%" }}
            animate={{ opacity: 1, scale: 1, y: "-50%", x: "-50%" }}
            transition={{
              type: "tween",
              duration: 0.3,
            }}
            exit={{ opacity: 0 }}
            className="modal"
            style={{ position: isModal ? "fixed" : "static" }}
          >
            {isForm ? (
              <form onSubmit={disabled ? undefined : handleSubmit}>
                {content}
              </form>
            ) : (
              content
            )}
          </motion.div>
        </>,
        rootElement
      )
    : null;
};

export default Modal;
