import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../api/store";

import { getCart } from "../../utils/localStorage";

const initialState = {
  cartData: getCart(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    modifyCart: (state, action) => {
      state.cartData = action.payload;
    },
  },
});

export const { modifyCart } = cartSlice.actions;

export const selectCartData = (state: RootState) => state.cart.cartData;

export default cartSlice.reducer;
