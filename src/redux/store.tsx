import { configureStore } from "@reduxjs/toolkit";
import userLoginSlice from "./slices/userslices.js"


export const store = configureStore({
  reducer: {
   user : userLoginSlice
  },
  
})

