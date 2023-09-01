import { v4 as uuid } from "uuid";

import { categories } from "../constants";

import "./style.scss";

const CateringCategory = ({
  getCategory,
  handleToggle,
}: {
  getCategory: (category: string) => void;
  handleToggle: () => void;
}) => {
  const handleClick = (ctg: string) => {
    getCategory(ctg);
    handleToggle();
  };

  return (
    <div className="catering-ctg__list">
      {categories?.length ? (
        <ul>
          {categories.map((ctg) => {
            return (
              <li key={uuid()}>
                <div
                  className="catering-ctg__list__option"
                  onClick={() => handleClick(ctg)}
                >
                  <span>{ctg}</span>
                </div>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

export default CateringCategory;
