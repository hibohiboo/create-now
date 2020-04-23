import * as React from 'react'
import { Provider } from 'react-redux'
import App, { AppContext } from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { get } from 'lodash'
import { makeStore } from '~/store'
import { RootState } from '~/store/rootState'
import theme from '../theme'
import authModule from '~/store/modules/authModule'

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
  public static async getInitialProps({ Component, ctx }: AppContext) {
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
      if (!ctx.store.getState().auth.authUser) {
        ctx.store.dispatch(createClientSide())
      }
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
      </Provider>
    )
  }
}

export default withRedux(makeStore, {
  debug: process.env.NODE_ENV === 'development',
})(MyApp)
