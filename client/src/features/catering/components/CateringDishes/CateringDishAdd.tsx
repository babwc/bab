import { Dispatch, SetStateAction } from "react";

import { AiOutlinePlusCircle } from "react-icons/ai";

import "./CateringDishAdd.scss";

const CateringDishAdd = ({
  setNewDishOpen,
}: {
  setNewDishOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <div className="catering-dishes__add">
      <div
        className="catering-dishes__add__btn"
        onClick={() => setNewDishOpen(true)}
      >
        <AiOutlinePlusCircle size={30} color={"#008000"} />
      </div>
    </div>
  );
};

export default CateringDishAdd;
