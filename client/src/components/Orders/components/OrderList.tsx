import { useState, useEffect } from "react";

import { useAppDispatch, useTypedSelector } from "../../../api/store";

import { useMyOrdersQuery } from "../../../api/services/user";
import { useGetOrdersQuery } from "../../../api/services/order";

import {
  selectOrderStatus,
  selectOrderType,
  setOrderType,
} from "../orderSlice";

import { selectCurrentUser } from "../../../features/auth/authSlice";

import OrderDetails from "./OrderDetails";
import Pagination from "../../Pagination";
import Loading from "../../Loading";

import { IOrder } from "../../../ts/interfaces";
import { Order_Status, Order_Type } from "../../../ts/types";

const limit = 10;

const OrderList = ({
  orderType: orderTypeInput,
  searchValue,
}: {
  orderType: Order_Type;
  searchValue: string;
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const dispatch = useAppDispatch();

  const orderType = useTypedSelector(selectOrderType);
  const orderStatus = useTypedSelector(selectOrderStatus);

  const { name } = useTypedSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(setOrderType(orderTypeInput));
  }, [dispatch, orderTypeInput]);

  const myOrders = useMyOrdersQuery(
    {
      name,
      status: orderStatus,
      searchValue,
      currentPage,
      limit,
    },
    { skip: orderType !== Order_Type.USER }
  );

  const globalOrders = useGetOrdersQuery(
    {
      status: orderStatus,
      searchValue,
      currentPage,
      limit,
    },
    { skip: orderType !== Order_Type.GLOBAL }
  );

  const { data, isLoading, isFetching } =
    orderType === Order_Type.GLOBAL ? globalOrders : myOrders;

  if (isLoading) {
    return <Loading />;
  }

  return data?.orders.length ? (
    <>
      <div
        style={{
          height: "100%",
        }}
      >
        {data?.orders.map((order: IOrder) => {
          return <OrderDetails key={order._id} data={order} />;
        })}
      </div>
      {data.total > limit ? (
        <Pagination
          limit={limit}
          total={data.total}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      ) : null}
    </>
  ) : !isFetching ? (
    <h2>
      {orderStatus === Order_Status.ALL
        ? "Order list is empty"
        : `No ${orderStatus.toLowerCase()} orders at the moment`}
    </h2>
  ) : null;
};

export default OrderList;
