import { Navigate, useLocation } from "react-router-dom";

import CheckoutElements from "./CheckoutElements";

import "./CheckoutContainer.scss";

export const CheckoutContainer = () => {
  const location = useLocation();

  return location.state?.fromCart ? (
    <div className="checkout">
      <CheckoutElements />
    </div>
  ) : (
    <Navigate to={"/"} replace />
  );
};
