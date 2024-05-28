// src/store/productSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://fakestoreapi.com';

// Async thunk for fetching products by category
export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async ({ categoryName, page }) => {
    const response = await fetch(`${API_BASE_URL}/products/category/${categoryName}`);
    const data = await response.json();
    // Fake Store API doesn't support pagination, so we implement it client-side
    const itemsPerPage = 10;
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = page * itemsPerPage;
    return { products: data.slice(startIndex, endIndex), page };
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    page: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchProductsByCategory.pending, state => {
        state.status = 'loading';
        console.log('fetchProductsByCategory.loading');
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload.products;
        state.page = action.payload.page;
        console.log('fetchProductsByCategory.succeeded');
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
        console.log('fetchProductsByCategory.failed');

      });
  },
});

export default productSlice.reducer;
