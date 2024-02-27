import { createSlice } from '@reduxjs/toolkit';
import { fetchAllIds, fetchItems, filterItems } from './actionCreators';

export interface IProduct {
  brand: number;
  id: string;
  price: number;
  product: string;
}

export interface IProductState {
  isLoading: boolean;
  allIds: string[];
  currentIds: string[];
  items: IProduct[];
}

export const productState: IProductState = {
  isLoading: false,
  allIds: [],
  currentIds: [],
  items: [],
};

export const productSlice = createSlice({
  name: 'products',
  initialState: productState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllIds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allIds = action.payload.filter(
          (id: string, index: number) => action.payload[index - 1] !== id,
        );
      })
      .addCase(fetchAllIds.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllIds.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(fetchItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.filter(
          (item: IProduct, index: number) => action.payload[index - 1]?.id !== item?.id,
        );
      })
      .addCase(fetchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchItems.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(filterItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.allIds = action.payload.filter(
          (id: string, index: number) => action.payload[index - 1] !== id,
        );
      })
      .addCase(filterItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(filterItems.rejected, (state) => {
        state.isLoading = false;
      });
  },
});
