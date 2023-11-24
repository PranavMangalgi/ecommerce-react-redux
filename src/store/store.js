import { configureStore } from "@reduxjs/toolkit";
import fetchProductReducer from "../features/fetchSlice";
import cartReducer from "../features/cartSlice";
const store = configureStore({
  reducer: { fetchStore: fetchProductReducer, cart: cartReducer },
});

export default store;
