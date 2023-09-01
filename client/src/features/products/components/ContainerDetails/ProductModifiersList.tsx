import ReactDOM from "react-dom";

import { motion } from "framer-motion";

import { useGetSomeProductsQuery } from "../../../../api/services/products";

import ItemDetails from "../../shared/ProductDetails";
import Close from "../../../../components/Close";
import Loading from "../../../../components/Loading";

import useFreezeBackground from "../../../../hooks/useFreezeBackground";

import "./ProductModifiersList.scss";

import { IProduct } from "../../../../ts/interfaces";

const ProductModifiersList = ({
  productId,
  handleList,
}: {
  productId: string;
  handleList: () => void;
}) => {
  useFreezeBackground();

  const { data: products, isLoading } = useGetSomeProductsQuery(productId);

  if (isLoading) {
    return <Loading pageLoading={true} />;
  }

  const content = (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8, y: "-50%", x: "-50%" },
        visible: {
          y: "-50%",
          x: "-50%",
          opacity: 1,
          scale: 1,
          transition: {
            duration: 0.3,
            delayChildren: 0.3,
            staggerChildren: 0.2,
          },
        },
        exit: { opacity: 0 },
      }}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="modifiers__list"
    >
      <div className="modifiers__list__close" onClick={handleList}>
        <Close />
      </div>
      <div className="modifiers__list__body">
        {products?.map((product: any) => {
          return <ItemDetails key={product._id} product={product} />;
        })}
      </div>
    </motion.div>
  );

  const rootElement = document.querySelector("#list");
  return rootElement ? ReactDOM.createPortal(content, rootElement) : null;
};

export default ProductModifiersList;
