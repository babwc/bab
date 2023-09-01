import { v4 as uuid } from "uuid";

import MenuDetails from "./MenuDetails";

import dataList from "../dataList";

import "./MenuList.scss";

import { Dish } from "../types";

const MenuList = () => {
  return (
    <div className="menu__list">
      <div className="menu__body">
        {dataList.map((data: { title: string; dishes: Dish[] }) => {
          return <MenuDetails key={uuid()} data={data} />;
        })}
      </div>
    </div>
  );
};

export default MenuList;
