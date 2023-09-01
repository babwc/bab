import CateringDishesDetails from "./CateringDishesDetails";

import "./CateringDishesList.scss";

import { IDish } from "../../../../ts/interfaces";

const CateringDishesList = ({
  cateringDishes,
}: {
  cateringDishes: IDish[];
}) => {
  return (
    <div className="catering-dishes__body">
      {cateringDishes?.map((dish: IDish, i: number) => (
        <CateringDishesDetails key={dish._id} index={i} dish={dish} />
      ))}
    </div>
  );
};

export default CateringDishesList;
