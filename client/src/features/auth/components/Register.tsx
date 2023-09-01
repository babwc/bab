import { useState, useEffect, FormEvent, useCallback, forwardRef } from "react";

import { useRegisterMutation } from "../../../api/services/auth";

import { useNavigate } from "react-router-dom";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ConfirmPopup from "../../../components/ConfirmPopup";
import ErrorMessage from "../../../components/ErrorMessage";

import useForm from "../../../hooks/useForm";
import useServerError from "../../../hooks/useServerError";

import "./Form.scss";

export interface RegisterInputs {
  name: string;
  email: string;
  password: string;
}

const initialValue: RegisterInputs = {
  name: "",
  email: "",
  password: "",
};

const Register = forwardRef((_props, ref: any) => {
  const navigate = useNavigate();

  const [confirmationTip, setConfirmationTip] = useState<boolean>(false);

  const [register] = useRegisterMutation();

  const { value, error, handleChange, handleFocus, handleSubmitWrap } = useForm(
    {
      initialValue,
      requiredFields: Object.keys(initialValue),
    }
  );

  const { serverError, handleServerError } = useServerError();

  const handleConfirmationTip = useCallback(() => {
    setConfirmationTip(false);
    navigate("/");
  }, [navigate]);

  useEffect(() => {
    if (confirmationTip) {
      const timeout = setTimeout(() => {
        handleConfirmationTip();
      }, 5000);

      return () => clearTimeout(timeout);
    }
  }, [confirmationTip, handleConfirmationTip]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      const recapToken = await ref?.current?.executeAsync();

      ref.current?.reset();

      try {
        const data = await register({ ...value, recapToken }).unwrap();

        data && navigate("/confirmation");
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  return (
    <>
      {confirmationTip ? (
        <ConfirmPopup
          header={`Please check your email (${value.email}) in order to activate your account`}
          handleMethod={handleConfirmationTip}
          confirmBtnTitle="Ok"
        />
      ) : null}
      <div className="auth-form">
        {serverError && typeof serverError === "string" ? (
          <ErrorMessage error={serverError} />
        ) : null}
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            value={value.name}
            error={error.name}
            handleFocus={handleFocus}
            handleChange={handleChange}
          />
          <Input
            label="Email"
            name="email"
            value={value.email}
            error={error.email}
            handleFocus={handleFocus}
            handleChange={handleChange}
          />
          <Input
            label="Password"
            name="password"
            type="password"
            value={value.password}
            error={error.password}
            handleFocus={handleFocus}
            handleChange={handleChange}
          />
          <div className="auth-form__footer">
            <Button isSubmit={true}>Register</Button>
          </div>
        </form>
      </div>
    </>
  );
});

export default Register;
