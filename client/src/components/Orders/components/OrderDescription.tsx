import { motion } from "framer-motion";

import OrderDescrDetails from "./OrderDescrDetails";
import Close from "../../Close";

import useFreezeBackground from "../../../hooks/useFreezeBackground";

import "./OrderDescription.scss";

import { IProductInOrder } from "../../../ts/interfaces";

const OrderDescription = ({
  items,
  totalPrice,
  handleToggle,
}: {
  items: { product: IProductInOrder; quantity: number }[];
  totalPrice: number;
  handleToggle: () => void;
}) => {
  useFreezeBackground();

  return (
    <motion.div
      key={"order-descr"}
      className="order__description"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="order__description__close" onClick={handleToggle}>
        <Close />
      </div>
      <div className="order__description__items">
        {items.map((item: { product: IProductInOrder; quantity: number }) => {
          return <OrderDescrDetails key={item.product.id} item={item} />;
        })}
      </div>
      <div className="order__description__total">
        <h2>Total: {totalPrice}$</h2>
      </div>
    </motion.div>
  );
};

export default OrderDescription;
