import { useState } from "react";

import { AnimatePresence } from "framer-motion";

import { IoMdSettings } from "react-icons/io";

import { useDeleteProductMutation } from "../../../api/services/products";

import ProductEdit from "./ProductEdit";
import ConfirmPopup from "../../../components/ConfirmPopup";
import AppearAnim from "../../../components/AppearAnim";

import usePopup from "../../../hooks/usePopup";

import IconDelete from "../../../assets/icons/delete.svg";
import IconDissolve from "../../../assets/icons/cross.svg";
import IconEdit from "../../../assets/icons/edit.svg";

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
            <img src={IconEdit} alt="Edit" />
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
                <img src={IconDissolve} alt="Dissolve" />
                <span>Dissolve</span>
              </>
            ) : (
              <>
                <img src={IconDelete} alt="Delete" />
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
