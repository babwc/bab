import { useState, useRef, useCallback } from "react";
import { v4 as uuid } from "uuid";

import OpenIcon from "../../../components/OpenIcon";
import ForkSpoon from "../../../assets/icons/fork-spoon.svg";

import "./BanquetDetails.scss";

const BanquetDetails = ({
  data,
}: {
  data: { title: string; dishes: string[] };
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const ref = useRef<any>(null);

  const { title, dishes } = data;

  const capitalize = useCallback((string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }, []);

  return (
    <li className="banquet__dish">
      <div
        className="banquet__dish__header"
        onClick={() => setIsOpen((open) => !open)}
      >
        <h2 className="banquet__dish__header__title">{title}</h2>
        <OpenIcon isOpen={isOpen} />
      </div>
      <ul
        ref={ref}
        className="banquet__dish__body"
        style={{
          maxHeight: isOpen ? ref.current.scrollHeight + "px" : "0",
        }}
      >
        {dishes.map((dish: string) => (
          <li key={uuid()} className="banquet__dish__option">
            <img src={ForkSpoon} alt="Point" />
            <h3>{capitalize(dish)}</h3>
          </li>
        ))}
      </ul>
    </li>
  );
};

export default BanquetDetails;
