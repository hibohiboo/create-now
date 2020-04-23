import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from '~/utils/auth/initFirebase'
import { createAuthUser, createAuthUserInfo } from '~/utils/auth/user'
import { setSession } from '~/utils/auth/firebaseSessionHandler'

initFirebase()
export interface AuthUser {
  id: string
  displayName: string
  photoURL: string
}

export interface AuthUserInfo {
  AuthUser?: AuthUser
  token?: string
}
interface ServerSidePayload {
  firebaseUser: firebase.User | null
  token: string | null
}

export const init: AuthUserInfo = { AuthUser: undefined, token: undefined }

const authModule = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    createServerSide: (state, action: PayloadAction<ServerSidePayload>) => {
      const { AuthUser, token } = createAuthUserInfo(action.payload)
      state.AuthUser = AuthUser
      state.token = token
    },
    createClientSide: (state) => {
      const user = firebase.auth().currentUser
      setSession(user)
      state.AuthUser = createAuthUser(user)
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
