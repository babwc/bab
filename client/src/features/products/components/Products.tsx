import { ChangeEvent, useState } from "react";

import Departments from "./Departments";
import Search from "../../../components/Search";
import ProductList from "./ProductList";

const Products = () => {
  const [currentDepartment, setCurrentDepartment] = useState<string>("");

  const [searchValue, setSearchValue] = useState<string>("");

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  return (
    <>
      <Departments
        currentDepartment={currentDepartment}
        setCurrentDepartment={setCurrentDepartment}
      />
      <Search value={searchValue} handleChange={handleSearchChange} />
      <ProductList searchValue={searchValue} department={currentDepartment} />
    </>
  );
};

export default Products;
