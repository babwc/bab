import { BsFillCartFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import useCartData from "../../hooks/useCartData";

import "./CartDataNav.scss";

const getTotalQuantity = (data: any) => {
  return data.reduce((total: number, { quantity }: any) => {
    return (total += quantity);
  }, 0);
};

const CartDataNav = () => {
  const navigate = useNavigate();

  const { cartData } = useCartData();

  return (
    <div className="cart-nav" onClick={() => navigate("/cart")}>
      <BsFillCartFill size={30} />
      {cartData ? (
        <div className="cart-nav__amount">
          {getTotalQuantity(cartData.items)}
        </div>
      ) : null}
    </div>
  );
};

export default CartDataNav;
