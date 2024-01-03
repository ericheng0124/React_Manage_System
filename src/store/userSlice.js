import {createSlice} from "@reduxjs/toolkit";
import storageUtils from "../utils/storageUtils";


const initUser = storageUtils.getUser()
// console.log(initUser)

const userSlice = createSlice({
  name: 'user',
  initialState: initUser,
  reducers: {
    setUser(state, action) {
      state = action.payload
    }
  }
})

export const {setUser}=userSlice.actions

export default userSlice