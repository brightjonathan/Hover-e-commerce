import { createSlice } from "@reduxjs/toolkit";

// Initial state
const initialState = {
  products: [],
  minPrice: 0, // Default to 0 instead of null
  maxPrice: 0,
};

const ProductSlice = createSlice({
  name: "Product",
  initialState,
  reducers: {
    // Store products safely
    STORE_PRODUCTs(state, action) {
      console.log("Storing Products:", action.payload?.products);
      state.products = action.payload?.products || []; // Ensures it's an array
    },
    // Get price range safely
    GET_PRICE_RANGE(state, action) {
      const products = action.payload?.products || []; // Ensure it's an array

      const array = products.map((product) => product.price || 0); // Prevent undefined values

      const max = array.length ? Math.max(...array) : 0; // Prevent errors with empty arrays
      const min = array.length ? Math.min(...array) : 0;

      state.minPrice = min;
      state.maxPrice = max;

      console.log("Price Range:", { min, max });
    },
  },
});

// Export actions
export const { STORE_PRODUCTs, GET_PRICE_RANGE } = ProductSlice.actions;

// Selectors
export const selectProducts = (state) => state.product?.products || [];
export const selectMinPrice = (state) => state.product?.minPrice || 0;
export const selectMaxPrice = (state) => state.product?.maxPrice || 0;

// Export reducer
export default ProductSlice.reducer;
