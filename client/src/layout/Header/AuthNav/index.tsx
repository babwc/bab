import { useState } from "react";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { BsFillPersonFill } from "react-icons/bs";

import AppearAnim from "../../../components/AppearAnim";
import ChangePassword from "./ChangePassword";
import UserOptions from "./UserOptions";

import { selectCurrentUserData } from "../../../features/auth/authSlice";

import usePopup from "../../../hooks/usePopup";

import "./style.scss";

const AuthNav = () => {
  const navigate = useNavigate();
  const [changePassOpen, setChangePassOpen] = useState<boolean>(false);

  const { userData, isAuth } = useSelector(selectCurrentUserData);

  const { ref, popupOpen, handleToggle } = usePopup();

  return (
    <>
      <div className="main-header__auth" ref={ref} onClick={handleToggle}>
        {isAuth ? (
          <>
            <div
              style={{ height: "100%" }}
              onClick={handleToggle}
              className="main-header__auth__wrap"
            >
              <h4 className="main-header__auth__name">{userData.name}</h4>
              <div className="main-header__auth__logo">
                <BsFillPersonFill size={25} color="#008000" />
              </div>
            </div>
            <AppearAnim motionKey="user-options" inProp={popupOpen}>
              <UserOptions
                handleToggle={handleToggle}
                handlePassModal={() => setChangePassOpen(!changePassOpen)}
              />
            </AppearAnim>
          </>
        ) : (
          <BsFillPersonFill size={30} onClick={() => navigate("/auth")} />
        )}
      </div>

      <ChangePassword
        changePassOpen={changePassOpen}
        setChangePassOpen={setChangePassOpen}
      />
    </>
  );
};

export default AuthNav;
