import { useEffect } from "react";
import { useAppDispatch } from "../../../../api/store";

import { v4 as uuid } from "uuid";

import { useTypedSelector } from "../../../../api/store";

import { selectOrderStatus, setOrderStatus } from "../../orderSlice";

import { Order_Status } from "../../../../ts/types";

import "./style.scss";

const statusList = [
  { label: "All", type: Order_Status.ALL },
  { label: "Accepted", type: Order_Status.ACCEPTED },
  { label: "Pending", type: Order_Status.PENDING },
  { label: "Cancelled", type: Order_Status.CANCELLED },
];

const OrderHeader = () => {
  const dispatch = useAppDispatch();
  const orderStatus = useTypedSelector(selectOrderStatus);

  useEffect(() => {
    dispatch(setOrderStatus(Order_Status.ALL));
  }, [dispatch]);

  return (
    <div className="order__header">
      <div className="order__status">
        <ul>
          {statusList.map(
            ({ label, type }: { label: string; type: Order_Status }) => {
              return (
                <li
                  key={uuid()}
                  className={type === orderStatus ? "selected" : ""}
                  onClick={() => dispatch(setOrderStatus(type))}
                >
                  {label}
                </li>
              );
            }
          )}
        </ul>
      </div>
    </div>
  );
};

export default OrderHeader;
