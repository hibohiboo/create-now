import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { get, has } from 'lodash'
import { auth } from '~/lib/firebase/initFirebase'
import { setSession } from '~/utils/auth/firebaseSessionHandler'

export interface AuthUser {
  uid: string
  displayName: string
  photoURL: string
}

export interface AuthUserInfo {
  authUser?: AuthUser
  token?: string
}
interface ServerSidePayload {
  firebaseUser: firebase.User | null
  token: string | null
}

const createAuthUser = (firebaseUser: firebase.User | null): AuthUser => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null
  }
  return {
    uid: get(firebaseUser, 'uid'),
    displayName: has(firebaseUser, 'name')
      ? get(firebaseUser, 'name') // cookie
      : has(firebaseUser, 'displayName')
      ? get(firebaseUser, 'displayName') // client SDK
      : get(firebaseUser, 'display_name'), // admin SDK
    photoURL: has(firebaseUser, 'picture')
      ? get(firebaseUser, 'picture') // cookie
      : has(firebaseUser, 'photoURL')
      ? get(firebaseUser, 'photoURL') // client SDK
      : get(firebaseUser, 'photo_url'), // admin SDK
  }
}

const createAuthUserInfo = ({
  firebaseUser = null,
  token = null,
} = {}): AuthUserInfo => {
  return {
    authUser: createAuthUser(firebaseUser),
    token,
  }
}

export const init: AuthUserInfo = { authUser: undefined, token: undefined }

const authModule = createSlice({
  name: 'auth',
  initialState: init,
  reducers: {
    createServerSide: (state, action: PayloadAction<ServerSidePayload>) => {
      const { authUser, token } = createAuthUserInfo(action.payload)
      state.authUser = authUser
      state.token = token
    },
    createClientSide: (state) => {
      const user = auth.currentUser
      setSession(user)
      state.authUser = createAuthUser(user)
    },
    logout: (state) => {
      state.authUser = null
      state.token = null
      setSession(null)
      auth.signOut()
    },
  },
})

export const useAuth = () => {
  return useSelector(
    (state: { auth: ReturnType<typeof authModule.reducer> }) =>
      state.auth.authUser,
  )
}

export default authModule
