import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useDeleteCateringDishMutation } from "../../../../api/services/catering";

import ConfirmPopup from "../../../../components/ConfirmPopup";
import IconDelete from "../../../../assets/icons/delete.svg";

import "./CateringDishDelete.scss";

const CateringDishDelete = ({ dishId }: { dishId: string }) => {
  const [deleteDish, { isSuccess }] = useDeleteCateringDishMutation();

  const [deleteOpen, setDeleteOpen] = useState<boolean>(false);

  return (
    <>
      <div
        className="catering-dishes__delete"
        onClick={() => setDeleteOpen(true)}
      >
        <img src={IconDelete} alt="Delete" />
      </div>

      <AnimatePresence>
        {deleteOpen && (
          <ConfirmPopup
            header={`Are you sure you want to delete this dish?`}
            closeModal={() => setDeleteOpen(false)}
            handleMethod={() => deleteDish({ uid: dishId })}
            processed={isSuccess}
            confirmBtnTitle="Yes"
            includeCancel={true}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default CateringDishDelete;
