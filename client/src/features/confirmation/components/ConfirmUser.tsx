import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useEmailConfirmMutation } from "../../../api/services/auth";

import useServerError from "../../../hooks/useServerError";

import ErrorMessage from "../../../components/ErrorMessage";

import Modal from "../../../components/Modal";
import Input from "../../../components/Input";

import "./ConfirmUser.scss";

export const ConfirmUser = () => {
  const [confirmCode, setConfirmCode] = useState<string>("");

  const [confirm] = useEmailConfirmMutation();

  const { serverError, handleServerError } = useServerError();

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = await confirm({ confirmCode }).unwrap();

      if (data) navigate("/");
    } catch (err) {
      if (err) {
        handleServerError(err);
      }
    }
  };

  return (
    <Modal
      header="Type in confirmation code that we sent to your email"
      backdrop={false}
      confirmBtnTitle="Submit"
      handleSubmit={handleSubmit}
    >
      {serverError && typeof serverError === "string" ? (
        <ErrorMessage error={serverError} />
      ) : null}
      <Input
        value={confirmCode}
        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmCode(e.target.value)
        }
      />
    </Modal>
  );
};

export default ConfirmUser;
