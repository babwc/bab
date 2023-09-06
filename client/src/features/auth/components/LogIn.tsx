import { FormEvent, forwardRef } from "react";

import { useLoginMutation } from "../../../api/services/auth";

import { useAppDispatch } from "../../../api/store";
import { setCredentials } from "../authSlice";

import { useNavigate } from "react-router-dom";

import useForm from "../../../hooks/useForm";
import useServerError from "../../../hooks/useServerError";

import Input from "../../../components/Input";
import Button from "../../../components/Button";
import ErrorMessage from "../../../components/ErrorMessage";

import "./Form.scss";

export interface LogInInputs {
  name: string;
  password: string;
}

const initialValue: LogInInputs = {
  name: "",
  password: "",
};

const LogIn = forwardRef((_props, ref: any) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [logIn] = useLoginMutation();

  const { value, error, handleChange, handleFocus, handleSubmitWrap } = useForm(
    {
      initialValue,
      requiredFields: Object.keys(initialValue),
    }
  );

  const { serverError, handleServerError } = useServerError();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    handleSubmitWrap(async () => {
      // const recapToken = await ref?.current?.executeAsync();

      // ref.current?.reset();

      try {
        const data = await logIn({ ...value, recapToken: "" }).unwrap();

        const userData = { ...data, isAuth: true };

        dispatch(setCredentials(userData));

        navigate("/");
      } catch (err) {
        handleServerError(err);
      }
    });
  };

  return (
    <>
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
            label="Password"
            name="password"
            type="password"
            value={value.password}
            error={error.password}
            handleFocus={handleFocus}
            handleChange={handleChange}
          />
          <div className="auth-form__footer">
            <Button isSubmit={true}>Log in</Button>
          </div>
        </form>
      </div>
    </>
  );
});

export default LogIn;
