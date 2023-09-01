import { OrderMain } from "../../../components/Orders";

import { Order_Type } from "../../../ts/types";

export const OrderContainer = () => {
  return <OrderMain orderType={Order_Type.GLOBAL} />;
};
