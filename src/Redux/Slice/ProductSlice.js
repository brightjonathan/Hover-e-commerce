import { createSlice } from "@reduxjs/toolkit";

//setting the initail state 
const initialState = {
    products: []
  };

  const ProductSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        //created a product store to store the payload
        STORE_PRODUCTs(state, action){
            //console.log(action.payload);
            state.products = action.payload.products;
        }
    }
  });

  //exporting the STORE_PRODUCTs
  export const {STORE_PRODUCTs} = ProductSlice.actions;

  //exporting the product array : products: []
  export const selectProducts = (state) => state.product.products

  export default ProductSlice.reducer;
  
