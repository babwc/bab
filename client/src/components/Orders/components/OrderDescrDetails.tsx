import "./OrderDescrDetails.scss";

import { IProductInOrder } from "../../../ts/interfaces";

const OrderDescrDetails = ({
  item: { product, quantity },
}: {
  item: { product: IProductInOrder; quantity: number };
}) => {
  const { name, department, image, price } = product;

  return (
    <div className="order-descr-details">
      <div className="order-descr-details__image">
        <img src={`${process.env.REACT_APP_URL}/uploads/${image}`} alt={name} />
      </div>
      <div className="order-descr-details__data">
        <div className="order-descr-details__header">
          <div className="order-descr-details__name">
            <h2>{name}</h2>
          </div>
          <div className="order-descr-details__department">
            <span>Department: {department}</span>
          </div>
        </div>
        <div className="order-descr-details__body">
          <div className="order-descr-details__quantity">
            <span>Quantity: {quantity}</span>
          </div>
          <div className="order-descr-details__price">
            <h3>Price: {(Number(price) * quantity).toFixed(2)}$</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDescrDetails;
