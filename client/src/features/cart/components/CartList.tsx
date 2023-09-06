import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { v4 as uuid } from "uuid";

import cloneDeep from "lodash.clonedeep";

import { useGetSettingDataQuery } from "../../../api/services/settings";

import CartDetails from "./CartDetails";
import Button from "../../../components/Button";

import useRequest from "../../../hooks/useRequest";

import { Settings, ReqMethod } from "../../../ts/types";
import { CartData, CartProduct } from "../../../ts/interfaces";

const CartList = ({ cartData }: { cartData: CartData }) => {
  const navigate = useNavigate();

  const [cartDataModified, setCartDataModified] = useState<any>([]);

  const { data: ordersData } = useGetSettingDataQuery(Settings.Orders);

  const { sendRequest } = useRequest();

  useEffect(() => {
    (async () => {
      const response = await sendRequest({
        method: ReqMethod.Post,
        url: "cart/images",
        body: { ids: cartData.items.map((item) => item.id) },
      });

      const cartDataUpd = cloneDeep(cartData.items).map((item: any) => {
        response?.data.forEach(
          ({ _id, image: imageUrl }: { _id: string; image: string }) => {
            if (item.id === _id) {
              item.data.image = imageUrl;
            }
          }
        );

        return item;
      });

      setCartDataModified(cartDataUpd);
    })();
  }, []);

  return (
    <>
      {cartDataModified.map((product: CartProduct) => {
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
