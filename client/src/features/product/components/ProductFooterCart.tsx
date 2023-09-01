import Button from "../../../components/Button";

import useCartData from "../../../hooks/useCartData";

import * as storage from "../../../utils/localStorage";

import "./ProductFooterCart.scss";

const ProductFooterCart = ({
  id,
  image,
  name,
  department,
  price,
  quantity,
}: {
  id: string;
  image: string;
  name: string;
  department: string;
  price: number;
  quantity: number;
}) => {
  const { modifyCartData } = useCartData();

  const handleClick = () => {
    modifyCartData(() => {
      storage.addToCart({
        id,
        data: {
          image,
          name,
          department,
          price: String(price),
        },
        quantity,
      });
    });
  };

  return (
    <div className="product__footer__cart">
      <Button
        animScale={false}
        additionalStyle={{ ...btnStyle }}
        handleClick={handleClick}
      >
        Add to cart
      </Button>
    </div>
  );
};

export default ProductFooterCart;

const btnStyle = {
  height: "60%",
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0",
};
