import { Operator } from "../../../ts/types";

export interface CartQuantityProps {
  quantity: number;
  handleQuantity: (operator: Operator) => void;
}
