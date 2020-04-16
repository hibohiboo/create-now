import React from 'react'
import { get, set } from 'lodash'
import { AuthUserInfoContext, useFirebaseAuth } from '../auth/hooks'
import {
  createAuthUser,
  createAuthUserInfo,
  AuthUser,
  AuthUserInfo,
} from '../auth/user'
import { NextPageContext } from 'next'
import { userInfoPropTypes } from './withAuthUserInfo'

export const getUserInfo = (obj: object): AuthUser => get(obj, 'AuthUser')
export const getAuthUserInfo = (ctx: NextPageContext): AuthUserInfo =>
  get(ctx, 'myCustomData.AuthUserInfo', null)

const getAuthUserInfoFromClient = (): AuthUserInfo => {
  try {
    const textContent = window?.document?.getElementById('__MY_AUTH_USER_INFO')
      ?.textContent
    if (!textContent) {
      return createAuthUserInfo()
    }
    const jsonData = JSON.parse(textContent)
    if (jsonData) {
      return jsonData
    }
    return createAuthUserInfo()
  } catch (e) {
    // If there's some error, use the default (unauthed) user info.
    return createAuthUserInfo()
  }
}

export default (ComposedComponent: any) => {
  const WithAuthUserComp = (props: any) => {
    const { AuthUserInfo, ...otherProps } = props
    const { user: firebaseUser } = useFirebaseAuth()
    const AuthUserFromClient = createAuthUser(firebaseUser)
    const { AuthUser: AuthUserFromSession, token } = AuthUserInfo
    const AuthUser = AuthUserFromClient || AuthUserFromSession || null

    return (
      <AuthUserInfoContext.Provider value={{ AuthUser, token }}>
        <ComposedComponent {...otherProps} />
      </AuthUserInfoContext.Provider>
    )
  }

  WithAuthUserComp.getInitialProps = async (ctx: NextPageContext) => {
    let authUserInfo
    if (typeof window === 'undefined') {
      const { req, res } = ctx
      // If server-side, get AuthUserInfo from the session in the request.
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { addSession } = require('../middleware/cookieSession')
      addSession(req, res)
      authUserInfo = createAuthUserInfo({
        firebaseUser: get(req, 'session.decodedToken', null),
        token: get(req, 'session.token', null),
      })
    } else {
      // If client-side, get AuthUserInfo from stored data. We store it
      // in _document.js. See:
      // https://github.com/zeit/next.js/issues/2252#issuecomment-353992669
      authUserInfo = getAuthUserInfoFromClient()
    }
    set(ctx, 'myCustomData.AuthUserInfo', authUserInfo)

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {}
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx)
    }

    return {
      ...composedInitialProps,
      AuthUserInfo: authUserInfo,
    }
  }

  WithAuthUserComp.displayName = `WithAuthUser(${ComposedComponent.displayName})`

  WithAuthUserComp.propTypes = userInfoPropTypes

  WithAuthUserComp.defaultProps = {}

  return WithAuthUserComp
}
