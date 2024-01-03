import {createSlice} from "@reduxjs/toolkit";

const initHeadTitle = '首页'

const headTitleSlice = createSlice({
  name:'headTitle',
  initialState:initHeadTitle,
  reducers:{
    setHeadTitle(state,action){
      state = action.payload
    }
  }
})

export const {setHeadTitle}=headTitleSlice.actions

export default headTitleSlice