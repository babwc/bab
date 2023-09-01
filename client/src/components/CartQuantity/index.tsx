import { BiPlus, BiMinus } from "react-icons/bi";

import Button from "../Button";

import { Operator } from "../../ts/types";

import "./style.scss";
import { CartQuantityProps } from "./ts/interfaces";

const CartQuantity = ({ quantity, handleQuantity }: CartQuantityProps) => {
  const quantityMin = quantity === 1;

  const styleBtn = (input: boolean) => {
    return input
      ? { ...btnStyle, backgroundColor: "rgba(0, 0, 0, .4)" }
      : btnStyle;
  };

  return (
    <div className="quantity">
      <h3>Quantity:</h3>
      <Button
        additionalStyle={styleBtn(quantityMin)}
        handleClick={
          quantityMin ? undefined : () => handleQuantity(Operator.Subtract)
        }
        disabled={quantityMin}
      >
        <BiMinus size={20} color={"#fff"} />
      </Button>
      <div className="quantity__number">
        <h4>{quantity}</h4>
      </div>
      <Button
        additionalStyle={styleBtn(false)}
        handleClick={() => handleQuantity(Operator.Add)}
        disabled={false}
      >
        <BiPlus size={20} color={"#fff"} />
      </Button>
    </div>
  );
};

export default CartQuantity;

const btnStyle = {
  height: "30px",
  width: "30px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#000",
  borderRadius: "50%",
  padding: "0",
};
