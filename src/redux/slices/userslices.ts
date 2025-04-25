import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null, 
  isAuthorized : false,
};

const userLoginSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    setUserLoggedIn: (state, action) => {
      state.user = action.payload; 
    },

    logoutUser: (state) => {
      state.user = null; 
    },
    setAuthorization: (state, action) => {
      state.isAuthorized = action.payload; 
    },
  },
});

export const { setUserLoggedIn, logoutUser ,setAuthorization } = userLoginSlice.actions;
export default userLoginSlice.reducer;
