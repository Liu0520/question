import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type UserDataType = {
  username: string
  nickname: string
}

const INITAL_STATE: UserDataType = { username: '', nickname: '' }

const userSlice = createSlice({
  name: 'user',
  initialState: INITAL_STATE,
  reducers: {
    loginReducer: (state: UserDataType, action: PayloadAction<UserDataType>) => {
      return action.payload //返回登录信息
    },
    logoutReducer: () => INITAL_STATE
  }
})

export const { loginReducer, logoutReducer } = userSlice.actions

export default userSlice.reducer
