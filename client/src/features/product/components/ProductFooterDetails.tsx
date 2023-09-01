import { Dispatch, SetStateAction } from "react";

import CartQuantity from "../../../components/CartQuantity";
import withDelayedQtyUpdate from "../../../components/CartQuantity/hoc/withDelayedQtyUpdate";

import "./ProductFooterDetails.scss";

const ProductFooterDetails = ({
  price,
  quantity,
  setQuantity,
}: {
  price: number | undefined;
  quantity: number;
  setQuantity: Dispatch<SetStateAction<number>>;
}) => {
  const CartQuantityDelayed = withDelayedQtyUpdate(CartQuantity);

  return (
    <div className="product__footer__details">
      <CartQuantityDelayed quantity={quantity} setQuantity={setQuantity} />
      <div className="product__footer__price">
        <h3>Price: {(quantity * price!).toFixed(2).replace(/[.,]00$/, "")}$</h3>
      </div>
    </div>
  );
};

export default ProductFooterDetails;
