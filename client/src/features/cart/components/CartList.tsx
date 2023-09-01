import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { useGetSettingDataQuery } from "../../../api/services/settings";

import CartDetails from "./CartDetails";
import Button from "../../../components/Button";

import { Settings } from "../../../ts/types";
import { CartData, CartProduct } from "../../../ts/interfaces";

const CartList = ({ cartData }: { cartData: CartData }) => {
  const navigate = useNavigate();

  const { data: ordersData } = useGetSettingDataQuery(Settings.Orders);

  return (
    <>
      {cartData.items.map((product: CartProduct) => {
        return <CartDetails key={uuid()} product={product} />;
      })}

      {ordersData?.mode ? (
        <Button
          handleClick={() =>
            navigate("/checkout", { state: { fromCart: true } })
          }
        >
          Checkout
        </Button>
      ) : null}
    </>
  );
};

export default CartList;
