import { OrderMain } from "../../../components/Orders";

import { Order_Type } from "../../../ts/types";

export const MyOrderContainer = () => {
  return <OrderMain orderType={Order_Type.USER} />;
};
