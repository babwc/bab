import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../api/store";

import { Order_Type } from "../../ts/types";
import { Order_Status } from "../../ts/types";

const initialState: { orderType: Order_Type; orderStatus: Order_Status } = {
  orderType: Order_Type.USER,
  orderStatus: Order_Status.ALL,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    setOrderType: (state, action) => {
      const orderType = action.payload;

      state.orderType = orderType;
    },
    setOrderStatus: (state, action) => {
      const orderStatus = action.payload;

      state.orderStatus = orderStatus;
    },
  },
});

export const { setOrderType, setOrderStatus } = orderSlice.actions;

export const selectOrderType = (state: RootState) => state.order.orderType;
export const selectOrderStatus = (state: RootState) => state.order.orderStatus;

export default orderSlice.reducer;
