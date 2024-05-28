// src/store/searchSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

// Async thunk for searching products
export const searchProducts = createAsyncThunk('products/searchProducts', async ({ query, page }) => {
  const response = await axios.get(`${API_BASE_URL}/products`);
  console.log("response11",response)
  const filteredProducts = response.data.filter(product =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
  // Implementing pagination client-side
  const itemsPerPage = 10;
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = page * itemsPerPage;
  return { products: filteredProducts.slice(startIndex, endIndex), page };
});

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchResults: [],
    page: 1,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(searchProducts.pending, state => {
        state.status = 'loading';
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.searchResults = action.payload.products;
        state.page = action.payload.page;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default searchSlice.reducer;
