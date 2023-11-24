import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: true,
  isError: false,
  data: null,
};

export const fetchProducts = createAsyncThunk("fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

export const fetchSlice = createSlice({
  name: "counter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.isloading = true;
    }),
      builder.addCase(fetchProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.data = payload;
      }),
      builder.addCase(fetchProducts.rejected, (state) => {
        state.isError = true;
      });
  },
});

export default fetchSlice.reducer;
