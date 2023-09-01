import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import ProductDetails from "../../shared/ProductDetails";
import ProductModifiersList from "./ProductModifiersList";

import { IContainer, IProduct } from "../../../../ts/interfaces";

const ContainerDetails = ({
  product,
  emptyContainer,
}: {
  product: IContainer;
  emptyContainer?: true;
}) => {
  const [listOpen, setListOpen] = useState<boolean>(false);

  const handleList = () => setListOpen(!listOpen);

  return (
    <div className="container-details">
      <ProductDetails
        product={product}
        handleList={handleList}
        emptyContainer={emptyContainer}
      />

      {product.modifiers && !emptyContainer ? (
        <AnimatePresence>
          {listOpen && (
            <ProductModifiersList
              products={product.modifiers as IProduct[]}
              handleList={handleList}
            />
          )}
        </AnimatePresence>
      ) : null}
    </div>
  );
};

export default ContainerDetails;
