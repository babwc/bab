import { CSSProperties } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Button from "../components/Button";

const successMsg =
  "Your order has been successfully set! Our team will review the order as soon as possible.";

const Success = () => {
  const { state } = useLocation();

  const navigate = useNavigate();

  return state ? (
    <div className="page narrow" style={style}>
      {state.isAuth ? (
        <>
          <h4
            style={{
              maxWidth: "700px",
              textAlign: "center",
              marginBottom: "10px",
            }}
          >{`${successMsg} In order to check current status of your order, procceed to your order list`}</h4>
          <Button handleClick={() => navigate("/myorders")}>
            My order list
          </Button>
        </>
      ) : (
        <h4>{successMsg}</h4>
      )}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default Success;

const style: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
