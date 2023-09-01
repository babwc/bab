import { useTypedSelector } from "../../../api/store";
import { selectCartData } from "../cartSlice";

import CartList from "./CartList";

import "./CartContainer.scss";

export const CartContainer = () => {
  const cartData = useTypedSelector(selectCartData);

  return (
    <div className="cart">
      {cartData ? (
        <CartList cartData={cartData} />
      ) : (
        <h2 className="cart__empty">Your cart is currently empty</h2>
      )}
    </div>
  );
};
