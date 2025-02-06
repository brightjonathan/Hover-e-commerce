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
          const { products, search } = action.payload;
          const tempProducts = products.filter(
            (product) =>
              product.name.toLowerCase().includes(search.toLowerCase()) ||
              product.category.toLowerCase().includes(search.toLowerCase())
          );

           state.filteredProducts = tempProducts;
        },
    }
  });

  export const {FILTER_BY_SEARCH} = FilterSlice.actions
  
  export const selectFilterProduct = (state) => state.filter.filteredProducts;

  export default FilterSlice.reducer;

