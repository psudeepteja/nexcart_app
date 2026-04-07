import { createSlice } from '@reduxjs/toolkit'
import { getProductsApi } from '../asyncThunk'

const initialState = {
  products: [],
  isLoading: "idle"
}

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsApi.pending, (state, action) => {
      state.isLoading = "pending";
    }).addCase(getProductsApi.fulfilled, (state, action) => {
      state.products = action.payload;
      state.isLoading = "idle";
    }).addCase(getProductsApi.rejected, (state, action) => {
      state.isLoading = "idle";
    })
  }
})

export default productSlice.reducer