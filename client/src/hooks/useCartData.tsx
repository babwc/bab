import { useTypedSelector, useAppDispatch } from "../api/store";

import { selectCartData } from "../features/cart/cartSlice";
import { modifyCart } from "../features/cart/cartSlice";

import * as storage from "../utils/localStorage";

const useCartData = () => {
  const dispatch = useAppDispatch();
  const cartData = useTypedSelector(selectCartData);

  const modifyCartData = (cb: () => void) => {
    cb();
    dispatch(modifyCart(storage.getCart()));
  };

  return { cartData, modifyCartData };
};

export default useCartData;
