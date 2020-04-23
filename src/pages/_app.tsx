import * as React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { get, set } from 'lodash'
import { makeStore } from '~/store'
import theme from '../theme'
import { rrfProps } from '~/utils/auth/initFirebase'
import authModule, { useAuth } from '~/store/modules/authModule'
import { createAuthUserInfo } from '~/utils/auth/user'

class MyApp extends App<ReduxWrapperAppProps<any>> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
    // Keep in mind that this will be called twice on server, one for page and second for error page
    // await new Promise<any>((res) => {
    //   setTimeout(() => {
    //     console.log('ctx')
    //     ctx.store.dispatch(
    //       set({
    //         AuthUser: { id: 'aaa', displayName: 'bbb', photoURL: '' },
    //         token: 'test',
    //       }),
    //     )
    //     res()
    //   }, 200)
    // })
    const { createServerSide, createClientSide } = authModule.actions
    if (typeof window === 'undefined') {
      const { req, res } = ctx
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { addSession } = require('../utils/middleware/cookieSession')
      addSession(req, res)
      const payload = {
        firebaseUser: get(req, 'session.decodedToken', null),
        token: get(req, 'session.token', null),
      }
      ctx.store.dispatch(createServerSide(payload))
    } else {
      ctx.store.dispatch(createClientSide())
    }

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...(Component.getInitialProps
          ? await Component.getInitialProps(ctx)
          : {}),
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    }
  }
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }
  public render() {
    const { Component, pageProps, store } = this.props
    return (
      <Provider store={store}>
        <ReactReduxFirebaseProvider dispatch={store.dispatch} {...rrfProps}>
          <React.Fragment>
            <Head>
              <title>Create Now</title>
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component {...pageProps} />
            </ThemeProvider>
          </React.Fragment>
        </ReactReduxFirebaseProvider>
      </Provider>
    )
  }
}

export default withRedux(makeStore, { debug: true })(MyApp)
