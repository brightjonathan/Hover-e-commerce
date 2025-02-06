import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './Slice/AuthSlice';
import ProductReducer from './Slice/ProductSlice';
import filterReducer from './Slice/FilterSlice';
import OrderReducer from './Slice/OrderSlice'
import cartReducer from './Slice/CartSlice';
import checkoutReducer from './Slice/CheckoutSlice'

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
  filter: filterReducer,

  //from slice/orderslice
  orders: OrderReducer,
  
  //from slice/cartslice
  cart: cartReducer,
  
  //from slice/checkoutslice
  checkout: checkoutReducer
  
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => middleware(getDefaultMiddleware),
});


export default store;



