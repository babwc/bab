import { useEffect, useContext, FormEvent } from "react";

import { useDeleteProductMutation } from "../../../api/services/products";

import Modal from "../../../components/Modal";

import { ProductIdCtx } from "../../../context";

interface Props {
  closeModal: () => void;
}

const ProductDelete = ({ closeModal }: Props) => {
  const [productDelete] = useDeleteProductMutation();

  const productId: any = useContext(ProductIdCtx);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await productDelete({ uid: productId });

    closeModal();
  };

  return (
    <Modal
      header="Are you sure you want to delete this product?"
      closeModal={closeModal}
      handleSubmit={handleSubmit}
      confirmBtnTitle="Yes"
    />
  );
};

export default ProductDelete;
