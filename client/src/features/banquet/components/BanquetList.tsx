import { v4 as uuid } from "uuid";

import BanquetDetails from "./BanquetDetails";

import { Data } from "../interfaces";

const BanquetList = ({ data }: { data: Data[] }) => {
  return (
    <ul className="banquet__dishes">
      {data.map((details: { title: string; dishes: string[] }) => {
        return <BanquetDetails key={uuid()} data={details} />;
      })}
    </ul>
  );
};

export default BanquetList;
