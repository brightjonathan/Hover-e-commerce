import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orderHistory: [],  // Ensuring it is always an array
  totalOrderAmount: 0, // Changed from null to 0 for safer calculations
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    STORE_ORDERS(state, action) {
      state.orderHistory = action.payload || []; // Ensure it's an array
    },
    CALC_TOTAL_ORDER_AMOUNT(state) {
      console.log("Order History Before Calculation:", state.orderHistory);

      if (!Array.isArray(state.orderHistory)) {
        console.error("Error: orderHistory is not an array", state.orderHistory);
        state.totalOrderAmount = 0;
        return;
      }

      state.totalOrderAmount = state.orderHistory
        .map((item) => item.orderAmount || 0)
        .reduce((total, amount) => total + amount, 0);

      console.log("Total Order Amount Calculated:", state.totalOrderAmount);
    },
  },
});

export const { STORE_ORDERS, CALC_TOTAL_ORDER_AMOUNT } = orderSlice.actions;

export const selectOrderHistory = (state) => {
  console.log("Redux State:", state);
  return state.orders?.orderHistory || []; // Safe optional chaining
};
export const selectTotalOrderAmount = (state) => state.orders?.totalOrderAmount || 0;

export default orderSlice.reducer;
