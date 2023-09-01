import { Dispatch, SetStateAction } from "react";

import { IProduct } from "../../../ts/interfaces";

export interface IValue {
  value: IProduct;
  setValue: Dispatch<SetStateAction<IProduct>>;
}
