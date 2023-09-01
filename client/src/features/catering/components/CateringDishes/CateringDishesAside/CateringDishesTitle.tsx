import "./CateringDishesTitle.scss";

const CateringDishesTitle = ({
  dish,
  currentDish,
  changeCurrentDish,
}: {
  dish: any;
  currentDish: any;
  changeCurrentDish: (newDish: any) => void;
}) => {
  return (
    <li className="catering-dishes__title__wrap">
      <div
        className="catering-dishes__title"
        onClick={() => changeCurrentDish(dish)}
        style={{ background: `${dish.id === currentDish.id ? "#262626" : ""}` }}
      >
        <span style={{ color: `${dish.id === currentDish.id ? "#fff" : ""}` }}>
          {dish.name}
        </span>
      </div>
    </li>
  );
};

export default CateringDishesTitle;
