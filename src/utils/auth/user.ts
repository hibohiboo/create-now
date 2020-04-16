import { get, has } from 'lodash'

export interface AuthUser {
  id: string
  displayName: string
}
export interface AuthUserInfo {
  AuthUser: AuthUser
  token: string
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
export const createAuthUser = (
  firebaseUser: firebase.User | null,
): AuthUser => {
  if (!firebaseUser || !firebaseUser.uid) {
    return null
  }
  return {
    id: get(firebaseUser, 'uid'),
    displayName: has(firebaseUser, 'displayName')
      ? get(firebaseUser, 'displayName') // client SDK
      : get(firebaseUser, 'display_name'), // admin SDK
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
export const createAuthUserInfo = ({
  firebaseUser = null,
  token = null,
} = {}): AuthUserInfo => {
  return {
    AuthUser: createAuthUser(firebaseUser),
    token,
  }
}
