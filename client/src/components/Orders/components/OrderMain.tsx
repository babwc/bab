import { useState, ChangeEvent } from "react";

import Search from "../../Search";
import OrderHeader from "./OrderHeader";
import OrderList from "./OrderList";

import { Order_Type } from "../../../ts/types";

export const OrderMain = ({ orderType }: { orderType: Order_Type }) => {
  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <>
      <OrderHeader />
      <Search
        value={searchValue}
        handleChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchValue(e.target.value)
        }
      />
      <OrderList orderType={orderType} searchValue={searchValue} />
    </>
  );
};
