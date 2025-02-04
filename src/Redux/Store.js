import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/AuthSlice';
import ProductReducer from './Slice/ProductSlice';
import filterReducer from './Slice/FilterSlice';

//middleware func... to stop some error
const middleware = (getDefaultMiddleware) => {
  return getDefaultMiddleware({
    serializableCheck: false,
  });
};

const rootReducer = combineReducers({

  //from slice/authSlice
  auth: authReducer,

  //from slice/productSlice
  product: ProductReducer,

  //from slice/FilterSlice
  filter: filterReducer

  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
});


export default store;



