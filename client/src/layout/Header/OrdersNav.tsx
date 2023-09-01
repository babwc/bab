import { useNavigate } from "react-router-dom";

import { useGetOrdersQuery } from "../../api/services/order";

import { Order_Status } from "../../ts/types";

import ForkSpoon from "../../assets/icons/fork-spoon-black.svg";

import "./OrdersNav.scss";

const OrdersNav = () => {
  const navigate = useNavigate();

  const { data: pendingOrders } = useGetOrdersQuery({
    status: Order_Status.PENDING,
  });

  return (
    <div className="orders-nav" onClick={() => navigate("/orders")}>
      <span>Orders</span>
      <img src={ForkSpoon} alt="Point" />
      {pendingOrders?.orders.length ? (
        <div className="orders-nav__amount">{pendingOrders.orders.length}</div>
      ) : null}
    </div>
  );
};

export default OrdersNav;
