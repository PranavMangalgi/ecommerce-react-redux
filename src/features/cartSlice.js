import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    addedToCart: [],
    totalAmount: 0,
    totalQty: 0,
  },
  reducers: {
    addItem: (state, { payload }) => {
      const exists = state.addedToCart.find(
        (product) => product.id == payload.id,
      );

      if (exists) {
        state.addedToCart = state.addedToCart.map((product) =>
          product.id == payload.id
            ? {
                ...product,
                qty: product.qty + payload.qty,
                totalPrice: product.totalPrice + payload.totalPrice,
              }
            : product,
        );
      } else {
        state.addedToCart.push(payload);
      }
    },
    removeItem: (state, { payload }) => {
      state.addedToCart = state.addedToCart.filter(
        (product) => product.id !== payload,
      );
      totalAmountQty(state);
    },
    removeAllItems: (state) => {
      state.addedToCart = [];
    },
    totalAmountQty: (state) => {
      state.totalAmount = 0;
      state.totalQty = 0;
      if (state.addedToCart) {
        state.addedToCart.forEach((product) => {
          if (product && product.totalPrice) {
            state.totalAmount += product.totalPrice;
            state.totalQty += product.qty;
          }
        });
      }
    },
  },
});

export const { addItem, removeItem, totalAmountQty, removeAllItems } =
  cartSlice.actions;

export default cartSlice.reducer;
