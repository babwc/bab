import { useState, useRef } from "react";

import ReCAPTCHA from "react-google-recaptcha";

import LogIn from "./LogIn";
import Register from "./Register";

import "./AuthContainer.scss";

import { AuthStatus } from "../ts/types";

import { recapPublic } from "../../../constant";

export const AuthContainer = () => {
  const [status, setStatus] = useState(AuthStatus.LogIn);

  const recapRef = useRef<ReCAPTCHA>();

  return (
    <div className="auth">
      <div className="auth-container">
        <div className="auth-container__wrap">
          <div className="auth-container__header">
            <div
              className={`auth-container__header__option ${
                status === AuthStatus.LogIn ? "chosen" : ""
              }`}
              onClick={() => setStatus(AuthStatus.LogIn)}
            >
              <h4>Log in</h4>
            </div>
            <div
              className={`auth-container__header__option ${
                status === AuthStatus.Register ? "chosen" : ""
              }`}
              onClick={() => setStatus(AuthStatus.Register)}
            >
              <h4>Register</h4>
            </div>
          </div>
          <div
            className={`auth-container__forms ${
              status === AuthStatus.Register ? "register" : ""
            }`}
          >
            <LogIn ref={recapRef} />
            <Register ref={recapRef} />
          </div>
        </div>
      </div>
      <ReCAPTCHA
        ref={recapRef as React.RefObject<ReCAPTCHA>}
        size="invisible"
        sitekey={"6LcmTXAnAAAAAKtZYQ1unPN6DqGk2ATWwkUfEAF9"}
      />
    </div>
  );
};
