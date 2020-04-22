import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export interface AuthUser {
  id: string
  displayName: string
  photoURL: string
}

export interface AuthUserInfo {
  AuthUser?: AuthUser
  token?: string
}

export const init: AuthUserInfo = { AuthUser: undefined, token: undefined }

// actions と reducers の定義
const authModule = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    set: (state, action: PayloadAction<AuthUserInfo>) => {
      console.log('authAction', action.payload)
      const { AuthUser, token } = action.payload
      state.AuthUser = AuthUser
      state.token = token
    },
  },
})

export const useAuth = () => {
  return useSelector(
    (state: { auth: ReturnType<typeof authModule.reducer> }) =>
      state.auth.AuthUser,
  )
}

export default authModule
