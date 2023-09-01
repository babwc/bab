import { NavLink } from "react-router-dom";

import Nav from "./Nav";
import Protected from "../../components/Protected";

import CartDataNav from "./CartDataNav";
import AdminSettings from "./AdminSettings";
import AuthNav from "./AuthNav";
import OrdersNav from "./OrdersNav";
import Reserve from "./Reserve";

import IBab from "../../assets/main-icon.gif";
import IBabSmall from "../../assets/main-icon-small.svg";

import "./style.scss";

const Header = () => {
  return (
    <header className="main-header">
      <NavLink to="/">
        <div className="main-icon">
          <img
            className="main-icon__small"
            src={IBabSmall}
            alt="Babushka Icon"
          />
          <img className="main-icon__large" src={IBab} alt="Babushka Icon" />
        </div>
      </NavLink>
      <div className="main-header__right">
        <Nav />
        <Protected requiredRoles={["admin"]}>
          <OrdersNav />
        </Protected>
        <Reserve />
        <AuthNav />
        <Protected requiredRoles={["admin"]}>
          <AdminSettings />
        </Protected>
        <CartDataNav />
      </div>
    </header>
  );
};

export default Header;
