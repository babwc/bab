import { ComponentType, Dispatch, SetStateAction } from "react";

import { Operator } from "../../../ts/types";
import { CartQuantityProps } from "../ts/interfaces";

const withDelayedQtyUpdate = <T,>(
  Component: ComponentType<T | CartQuantityProps>
) => {
  return ({
    quantity,
    setQuantity,
  }: {
    quantity: number;
    setQuantity: Dispatch<SetStateAction<number>>;
  }) => {
    const handleQuantity = (operator: Operator) => {
      setQuantity(operator === Operator.Add ? quantity + 1 : quantity - 1);
    };

    return <Component quantity={quantity} handleQuantity={handleQuantity} />;
  };
};

export default withDelayedQtyUpdate;
