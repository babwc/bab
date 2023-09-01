import { useState, useRef } from "react";
import { v4 as uuid } from "uuid";

import OpenIcon from "../../../components/OpenIcon";
import ForkSpoon from "../../../assets/icons/fork-spoon.svg";

import "./MenuDetails.scss";

import { Dish } from "../types";

const MenuDetails = ({
  data,
}: {
  data: {
    title: string;
    dishes: Dish[];
  };
}) => {
  const ref = useRef<HTMLUListElement>(null);

  const { title, dishes } = data;

  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="menu__dishes">
      <div className="main__dishes__content">
        <div
          className="menu__dishes__header"
          onClick={() => setIsOpen((open) => !open)}
        >
          <h2 className="menu__dishes__title">{title}</h2>
          <OpenIcon isOpen={isOpen} />
        </div>
        <ul
          ref={ref}
          className="menu__dishes__list"
          style={{ maxHeight: isOpen ? ref.current?.scrollHeight + "px" : "0" }}
        >
          {dishes.map(({ name, price, description }: Dish) => {
            return (
              <li key={uuid()} className="menu__dishes__option">
                <div className="menu__dishes__option__header">
                  <div className="menu__option__name">
                    <img src={ForkSpoon} alt="Point" />
                    <h3>{name}</h3>
                  </div>
                  <h3 className="menu__option__price">${price}</h3>
                </div>
                <div className="menu__dishes__option__body">
                  <p className="menu__option__descr">{description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default MenuDetails;
