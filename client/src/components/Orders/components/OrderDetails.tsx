import { useState } from "react";
import { useTypedSelector } from "../../../api/store";

import { AnimatePresence } from "framer-motion";

import Moment from "react-moment";

import { MdCheck, MdRemoveRedEye } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import {
  useAcceptOrderMutation,
  useCancelOrderMutation,
} from "../../../api/services/order";

import { selectOrderType } from "../orderSlice";

import Button from "../../Button";
import OrderDescription from "./OrderDescription";

import "./OrderDetails.scss";

import { Order_Type } from "../../../ts/types";
import { IOrder } from "../../../ts/interfaces";

const OrderDetails = ({ data }: { data: IOrder }) => {
  const [descrOpen, setDescrOpen] = useState<boolean>(false);

  const orderType = useTypedSelector(selectOrderType);

  const {
    _id,
    customer,
    status,
    items,
    date,
    phone,
    createdAt,
    orderNumber,
    totalPrice,
  } = data;

  const [acceptOrder] = useAcceptOrderMutation();
  const [cancelOrder] = useCancelOrderMutation();

  const handleToggle = () => setDescrOpen(!descrOpen);

  return (
    <>
      <div className={`order__details ${status.toLowerCase()}`}>
        <div className="order__details__title">
          <h4>{customer}</h4>
        </div>
        <div className="order__details__body">
          <ul className="order__details__data">
            {orderNumber ? (
              <li>
                <h4>Order Number</h4>
                <span>{orderNumber}</span>
              </li>
            ) : null}
            {orderType === Order_Type.GLOBAL ? (
              <li>
                <h4>Phone</h4>
                <span>{phone}</span>
              </li>
            ) : null}
            <li>
              <h4>Order Date</h4>
              <span>
                <Moment format="MM/DD/YYYY">{createdAt}</Moment>
              </span>
            </li>
            <li>
              <h4>Pick Up Date</h4>
              <span>{date}</span>
            </li>
            <li>
              <h4>Total</h4>
              <span>{totalPrice}$</span>
            </li>
          </ul>
          <div
            className="order__details__observe"
            onClick={() => setDescrOpen(!descrOpen)}
          >
            <MdRemoveRedEye color="#fff" size={30} />
          </div>
          {orderType === Order_Type.GLOBAL && status === "Pending" ? (
            <div className="order__details__decision">
              <Button
                additionalStyle={btnStyle}
                handleClick={() => acceptOrder({ _id })}
              >
                <MdCheck size={25} />
              </Button>
              <Button
                additionalStyle={{ ...btnStyle, backgroundColor: "#b30000" }}
                handleClick={() => cancelOrder({ _id })}
              >
                <RxCross2 size={25} />
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      <AnimatePresence>
        {descrOpen && (
          <OrderDescription
            items={items}
            totalPrice={totalPrice}
            handleToggle={handleToggle}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default OrderDetails;

const btnStyle = {
  height: "35px",
  width: "35px",
  padding: "0",
  borderRadius: "50%",
};
