import { MdDelete } from "react-icons/md";

import CartQuantity from "../../../components/CartQuantity";
import withInstantQtyUpdate from "../../../components/CartQuantity/hoc/withInstantQtyUpdate";

import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import "./CartDetails.scss";

import { CartProduct } from "../../../ts/interfaces";

const CartDetails = ({ product }: { product: CartProduct }) => {
  const { id: productId, data, quantity } = product;

  const { name, image, price } = data!;

  const { modifyCartData } = useCartData();

  const CartQuantityInstant = withInstantQtyUpdate(CartQuantity);

  return (
    <>
      <div className="cart__product">
        <div
          className="cart__product__delete"
          onClick={() => {
            modifyCartData(() => storage.deleteProduct(productId));
          }}
        >
          <MdDelete size={25} color={"#b30000"} />
        </div>
        <div className="cart__product__image">
          <img
            src={`${process.env.REACT_APP_URL}/uploads/${image}`}
            alt={name}
          />
        </div>
        <div className="cart__product__body">
          <div className="cart__product__name">
            <h2>{name}</h2>
          </div>
          <div className="cart__product__footer">
            <CartQuantityInstant productId={productId} quantity={quantity} />
            <div className="cart__product__price">
              <h3>
                Price:{" "}
                {(Number(price) * quantity).toFixed(2).replace(/[.,]00$/, "")}$
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
