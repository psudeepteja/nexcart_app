import { createSlice } from "@reduxjs/toolkit";
import { getProductsApi } from "../asyncThunk";

export const homeProductSlice = createSlice({
  name: "homeProduct",
  initialState: {
    menCollections: [],
    womenCollections: [],
    jewelery: [],
    electronics: [],
    isProductLoading: "idel"
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsApi.pending, (state, action) => {
      state.isProductLoading = "pending"
    }).addCase(getProductsApi.fulfilled, (state, action) => {
        state.isProductLoading = "idel"
        const { arg } = action.meta;
        const categoryType = arg.replace("products/category/", "")
        const { payload } = action;
        if (categoryType === "men's clothing") {
          state.menCollections = payload;
        } else if (categoryType === "women's clothing") {
          state.womenCollections = payload;
        } else if (categoryType === "jewelery") {
          state.jewelery = payload;
        } else if (categoryType === "electronics") {
          state.electronics = payload;
        }
      })
      .addCase(getProductsApi.rejected, (state, action) => {
        state.isProductLoading = "idel"
      })
  }
})

export default homeProductSlice.reducer