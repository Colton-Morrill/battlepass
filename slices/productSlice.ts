import { createSlice, createSelector, createAsyncThunk, } from "@reduxjs/toolkit";
import axios from 'axios'

export const fetchProducts = createAsyncThunk(
   "products/fetchProducts", async (_, thunkAPI) => {
      try {
         //const response = await fetch(`url`); //where you want to fetch data
         //Your Axios code part.
         const response = await axios.get(`https://jsonplaceholder.typicode.com/users`);//where you want to fetch data
         return await response.data;
      } catch (error) {
         return thunkAPI.rejectWithValue({ error: "Error" });
      }
   });

export interface productsState {
   products: any,
   loading: string,
   error: any,
}

const initialState: productsState = {
   products: [],
   loading: "idle",
   error: "",
}

const productsSlice = createSlice({
   name: "products",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
      builder.addCase(fetchProducts.pending, (state) => {
         state.products = [];
         state.loading = "loading";
      });
      builder.addCase(
         fetchProducts.fulfilled, (state, { payload }) => {
            state.products = payload;
            state.loading = "loaded";
         });
      builder.addCase(
         fetchProducts.rejected, (state, action) => {
            state.loading = "error";
            state.error = action.error.message;
         });
   }
});


export const selectProducts = createSelector(
   (state:any) => ({
      products: state.products,
      loading: state.products.loading,
   }), (state) => state
);
export default productsSlice;