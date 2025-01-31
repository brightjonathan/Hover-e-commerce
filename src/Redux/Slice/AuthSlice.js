import { createSlice } from "@reduxjs/toolkit";

//setting the initail state 
const initialState = {
    isLogged: false,
    email: null,
    FullName: null,
    userID: null
  };


  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        SET_ACTIVE_USER: (state, action )=>{
            //console.log(action.payload);

            //de-structuring the action.payload
            const {FullName, email, userID} = action.payload;

            //updating the user Payload
            state.isLogged = true;
            state.email = email;
            state.FullName = FullName;
            state.userID = userID
        },
        //LOGOUT ACTIVE USER STATE
        REMOVE_ACTIVE_USER: (state, action)=>{

          state.isLogged = false;
          state.email = null;
          state.FullName = null;
          state.userID = null;
          //console.log(state.isLogged);
        }
    }
  });


  export const {SET_ACTIVE_USER, REMOVE_ACTIVE_USER} = authSlice.actions;


  //setting the state of the auth state for each of the initail state
  export const selectIsLoggedIn = (state)=> state.auth.isLogged;
  export const selectemail = (state)=> state.auth.email;
  export const selectfullname = (state)=> state.auth.FullName;
  export const selectuserid = (state)=> state.auth.userID;


  export default authSlice.reducer;

  