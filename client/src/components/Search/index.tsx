import { ChangeEvent } from "react";
import { AiOutlineSearch } from "react-icons/ai";

import Button from "../Button";

import "./style.scss";

const Search = ({
  value,
  handleChange,
}: {
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className="product__search">
      <input
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />
      <div className="product__search__btn">
        <Button>
          <AiOutlineSearch size={25} />
        </Button>
      </div>
    </div>
  );
};

export default Search;
