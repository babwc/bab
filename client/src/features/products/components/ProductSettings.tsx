import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { IoMdSettings } from "react-icons/io";
import { MdEdit, MdDelete } from "react-icons/md";
import { RxCross2 } from "react-icons/rx";

import { useDeleteProductMutation } from "../../../api/services/products";

import ProductEdit from "./ProductEdit";
import ConfirmPopup from "../../../components/ConfirmPopup";
import AppearAnim from "../../../components/AppearAnim";

import usePopup from "../../../hooks/usePopup";

import "./ProductSettings.scss";

const ProductSettings = ({
  productId,
  isContainer,
}: {
  productId: string;
  isContainer: boolean;
}) => {
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  const [productDelete, { isSuccess }] = useDeleteProductMutation();

  const { ref, popupOpen, handleToggle } = usePopup();

  return (
    <>
      <div className="product-settings" ref={ref}>
        <div className="product-settings__btn" onClick={handleToggle}>
          <IoMdSettings size={25} color={"#008000"} />
        </div>
        <AppearAnim
          motionKey="product-settings__popup"
          inProp={popupOpen}
          className="product-settings__popup"
        >
          <div
            className="product-settings__popup__option"
            onClick={() => {
              setEditOpen(true);
              handleToggle();
            }}
          >
            <MdEdit size={20} color={"#b3b300"} />
            <span>Edit</span>
          </div>
          <div
            className="product-settings__popup__option"
            onClick={() => {
              setDeleteOpen(true);
              handleToggle();
            }}
          >
            {isContainer ? (
              <>
                <RxCross2 size={20} color={"#b30000"} />
                <span>Dissolve</span>
              </>
            ) : (
              <>
                <MdDelete size={20} color={"#b30000"} />
                <span>Delete</span>
              </>
            )}
          </div>
        </AppearAnim>
      </div>

      <AnimatePresence>
        {editOpen && (
          <ProductEdit
            productId={productId}
            closeModal={() => setEditOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteOpen && (
          <ConfirmPopup
            header={`Are you sure you want to ${
              isContainer ? "dissolve this container?" : "delete this product?"
            }`}
            closeModal={() => setDeleteOpen(false)}
            handleMethod={() => productDelete({ uid: productId })}
            processed={isSuccess}
            confirmBtnTitle="Yes"
            includeCancel={true}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductSettings;
