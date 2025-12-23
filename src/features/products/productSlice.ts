import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '@/types';
import { fetchProducts } from '@/services/products.api';

interface ProductState {
  items: Product[];
  isLoading: boolean;
  error: string | null;
  filteredItems: Product[];
  selectedCategory: string;
}

const initialState: ProductState = {
  items: [],
  isLoading: false,
  error: null,
  filteredItems: [],
  selectedCategory: 'all',
};

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  const products = await fetchProducts();
  return products;
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    filterByCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      if (action.payload === 'all') {
        state.filteredItems = state.items;
      } else {
        state.filteredItems = state.items.filter(
          (item) => item.category === action.payload
        );
      }
    },
    searchProducts: (state, action: PayloadAction<string>) => {
      const query = action.payload.toLowerCase();
      state.filteredItems = state.items.filter((item) =>
        item.title.toLowerCase().includes(query)
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
        state.filteredItems = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { filterByCategory, searchProducts } = productSlice.actions;
export default productSlice.reducer;
