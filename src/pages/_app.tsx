import * as React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import withRedux, { ReduxWrapperAppProps } from 'next-redux-wrapper'
import { makeStore } from '~/store'
import { RootState } from '~/store/rootState'
import theme from '../theme'

class MyApp extends App<ReduxWrapperAppProps<RootState>> {
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
