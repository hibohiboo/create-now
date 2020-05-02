import * as React from 'react'
import { Provider } from 'react-redux'
import App from 'next/app'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { setupStore } from '~/store'
import theme from '~/theme'
import '~/styles/global.css'
import I18n from '~/lib/i18n'

const store = setupStore()

class MyApp extends App {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }
  public render() {
    const { Component, pageProps } = this.props
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
            <I18n lngDict={pageProps.lngDict} locale={pageProps.lng}>
              <Component {...pageProps} />
            </I18n>
          </ThemeProvider>
        </React.Fragment>
      </Provider>
    )
  }
}

export default MyApp
