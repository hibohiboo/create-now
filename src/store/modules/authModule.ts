import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { get, has } from 'lodash'
import { auth } from '~/lib/firebase/initFirebase'
import { setSession } from '~/utils/auth/firebaseSessionHandler'

export interface AuthUser {
  id: string
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

/**
 * Take the user object from Firebase (from either the Firebase admin SDK or
 * or the client-side Firebase JS SDK) and return a consistent AuthUser object.
 * @param {Object} firebaseUser - A decoded Firebase user token or JS SDK
 *   Firebase user object.
 * @return {Object|null} AuthUser - The user object.
 * @return {String} AuthUser.id - The user's ID
 * @return {String} AuthUser.email - The user's email
 * @return {Boolean} AuthUser.emailVerified - Whether the user has verified their email
 */
const createAuthUser = (firebaseUser: firebase.User | null): AuthUser => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null
  }
  return {
    id: get(firebaseUser, 'uid'),
    displayName: has(firebaseUser, 'displayName')
      ? get(firebaseUser, 'displayName') // client SDK
      : get(firebaseUser, 'display_name'), // admin SDK
    photoURL: has(firebaseUser, 'photoURL')
      ? get(firebaseUser, 'photoURL') // client SDK
      : get(firebaseUser, 'photo_url'), // admin SDK
  }
}

/**
 * Create an object with an AuthUser object and AuthUserToken value.
 * @param {Object} firebaseUser - A decoded Firebase user token or JS SDK
 *   Firebase user object.
 * @param {String} firebaseToken - A Firebase auth token string.
 * @return {Object|null} AuthUserInfo - The auth user info object.
 * @return {String} AuthUserInfo.AuthUser - An AuthUser object (see
 *   `createAuthUser` above).
 * @return {String} AuthUser.token - The user's encoded Firebase token.
 */
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
