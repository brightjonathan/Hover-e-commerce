import { createSlice } from "@reduxjs/toolkit";

//setting the initail state 
const initialState = {
 filteredProducts: []
};


const FilterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {

        //createdv a filter by search payload
        FILTER_BY_SEARCH(state, action){
          const { products, Search } = action.payload;
          //console.log(products);
          
          const tempProducts = products.filter(
            (product) =>
              product.ProductName.toLowerCase().includes(Search.toLowerCase()) ||
              product.Category.toLowerCase().includes(Search.toLowerCase())
          );

           state.filteredProducts = tempProducts;
        },
    }
  });

  export const {FILTER_BY_SEARCH} = FilterSlice.actions
  
  export const selectFilterProduct = (state) => state.filter.filteredProducts;

  export default FilterSlice.reducer;

