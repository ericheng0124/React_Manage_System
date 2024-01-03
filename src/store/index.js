import {configureStore} from "@reduxjs/toolkit";
import headTitleSlice from "./headTitleSlice";
import userSlice from "./userSlice";
import loginApi from "./loginApi";



const store = configureStore({
  reducer:{
    headTitle:headTitleSlice.reducer,
    user:userSlice.reducer,
    [loginApi.reducerPath]:loginApi.reducer
  },
  middleware:getDefaultMiddleware =>
      getDefaultMiddleware().concat(loginApi.middleware),
})

export default store