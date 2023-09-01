import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import ProductNew from "./ProductNew";
import ProductAddBtn from "./ProductAddBtn";
import Products from "./Products";

import Authorization from "../../../components/Protected";

export const ProductsContainer = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleClick = () => setModalOpen(!modalOpen);

  return (
    <>
      <AnimatePresence>
        {modalOpen && <ProductNew closeModal={() => setModalOpen(false)} />}
      </AnimatePresence>
      <Authorization requiredRoles={["admin"]}>
        <ProductAddBtn handleClick={handleClick} />
      </Authorization>
      <Products />
    </>
  );
};
