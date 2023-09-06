import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";

import { BsFillCartPlusFill } from "react-icons/bs";

import Button from "../../../../components/Button";
import ProductSettings from "../../components/ProductSettings";
import Protected from "../../../../components/Protected";

import useCartData from "../../../../hooks/useCartData";

import * as storage from "../../../../utils/localStorage";

import "./style.scss";

import { IContainer, IProduct } from "../../../../ts/interfaces";

const ProductDetails = ({
  product,
  handleList,
  emptyContainer,
}: {
  product: IProduct | IContainer;
  handleList?: () => void;
  emptyContainer?: boolean;
}) => {
  const navigate = useNavigate();

  const {
    _id: id,
    uid,
    name,
    image,
    imageUrl,
    department,
    isContainer,
  } = product;

  const { modifyCartData } = useCartData();

  return (
    <motion.div
      key={uid}
      variants={{
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
      }}
      className="product-details"
    >
      <Protected requiredRoles={["admin"]}>
        <ProductSettings productId={uid} isContainer={isContainer} />
      </Protected>
      <div
        className={`product-details__body ${
          emptyContainer ? "empty-container" : ""
        }`}
      >
        <div className="product-details__img">
          {imageUrl ? <img src={imageUrl} alt={name} /> : null}
        </div>
      </div>
      <div className="product-details__footer">
        <div className="product-details__name">
          <h3>{name}</h3>
        </div>
        <div className="product-details__order-btn">
          {!isContainer ? (
            <>
              <Button
                disabled={!!storage.getItem(id)}
                handleClick={() => {
                  modifyCartData(() => {
                    return !!storage.getItem(id)
                      ? undefined
                      : storage.addToCart({
                          id,
                          data: {
                            image,
                            name,
                            department,
                            price: String((product as IProduct).price),
                          },
                          quantity: 1,
                        });
                  });
                }}
              >
                <BsFillCartPlusFill size={20} />
              </Button>
              <Button
                handleClick={() =>
                  navigate(
                    `/product/${uid}/${name.toLowerCase().replace(/\W+/g, "-")}`
                  )
                }
              >
                Details
              </Button>
            </>
          ) : product.modifiers && !emptyContainer ? (
            <Button handleClick={handleList}>View</Button>
          ) : null}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetails;
