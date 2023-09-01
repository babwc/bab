import { useEffect, useState } from "react";
import { useTypedSelector } from "../../../api/store";

import { NavLink, useLocation } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Hamburger from "../../../components/Hamburger";

import { useGetSettingDataQuery } from "../../../api/services/settings";
import { selectCurrentUser } from "../../../features/auth/authSlice";

import useRollDown from "../../../hooks/useRollDown";

import "./style.scss";

import { Role, Settings } from "../../../ts/types";

const Nav = () => {
  const location = useLocation();

  const [navMenu, setNavMenu] = useState(["", "catering", "contact", "cafe"]);

  const { ref, style, isOpen, handleState: handleMenu } = useRollDown();

  const { role } = useTypedSelector(selectCurrentUser);

  const { data: prodsSettingData } = useGetSettingDataQuery(Settings.Products);

  useEffect(() => {
    if (prodsSettingData?.mode || role === Role.Admin) {
      !navMenu.includes("market") &&
        setNavMenu((navList) => {
          return [...navList.slice(0, 1), "market", ...navList.slice(1)];
        });
    }
  }, [prodsSettingData, role, navMenu]);

  return (
    <>
      <div className="main-nav__icon">
        <Hamburger isOpen={isOpen} handleClick={handleMenu} />
      </div>
      <nav ref={ref} className="main-nav" style={isOpen ? style : undefined}>
        <ul>
          {navMenu.map((section) => (
            <li key={uuid()} onClick={() => isOpen && handleMenu()}>
              <NavLink
                to={section}
                style={
                  section === location.pathname.replace("/", "")
                    ? { color: "red" }
                    : {}
                }
              >
                {!section ? "home" : section}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};

export default Nav;
