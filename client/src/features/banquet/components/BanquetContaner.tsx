import { useState } from "react";

import { v4 as uuid } from "uuid";

import BanquetList from "./BanquetList";

import dataList from "../dataList";

import "./BanquetContaner.scss";

const optionWidth = 150;

export const BanquetContaner = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  return (
    <div className="banquet">
      <h1 className="banquet__title">Banquet Menu</h1>
      <div className="banquet__header">
        <div
          className="banquet__price"
          style={{ width: `${optionWidth * dataList.length}px` }}
        >
          {dataList.map(({ price }, i: number) => {
            return (
              <div
                onClick={() => setCurrentIndex(i)}
                key={uuid()}
                className="banquet__option"
                style={{ width: `${optionWidth}px` }}
              >
                ${price} per person
              </div>
            );
          })}
          <span
            className="banquet__indicator"
            style={{
              width: `${optionWidth}px`,
              transform: `translateX(${optionWidth * currentIndex}px)`,
            }}
          />
        </div>
      </div>

      <div className="banquet__body">
        <BanquetList key={uuid()} data={dataList[currentIndex].data} />
      </div>
    </div>
  );
};
