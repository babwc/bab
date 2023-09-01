import { useState } from "react";
import { addToCart, getCart } from "../utils/localStorage";
import { CartProduct } from "../ts/interfaces";

const useLocalStorage = () => {
  const [value, setValue] = useState(getCart());

  const handleValue = ({ id, quantity = 1 }: CartProduct) => {
    addToCart({ id, quantity });
    setValue(getCart());
  };

  return { value, handleValue };
};

export default useLocalStorage;
