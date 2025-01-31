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
          console.log(action.payload);
        },
    }
  });

  export const {FILTER_BY_SEARCH} = FilterSlice.actions
  
  export const selectFilterProduct = (state) => state.filter.filteredProducts;

  export default FilterSlice.reducer











//   import { createSlice } from "@reduxjs/toolkit";

// //setting the initail state 
// const initialState = {

// };


// const FilterSlice = createSlice({
//     name: Product,
//     initialState,
//     reducers: {}
//   });

//   export const {} = FilterSlice.actions

//   export default FilterSlice.reducer
