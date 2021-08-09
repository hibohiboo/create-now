import * as React from 'react'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import { setupStore } from '~/store'
import theme from '~/theme'
import '~/styles/global.scss'
import I18n from '~/lib/i18n'

const store = setupStore()

// Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer's output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI を回避
const tmp: any = React
tmp.useLayoutEffect = React.useEffect

export default function MyApp(props) {
  const { Component, pageProps } = props
  // https://github.com/mui-org/material-ui/blob/master/examples/nextjs/pages/_app.js
  // const useIsomorphicLayoutEffect =
  //   typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect
  const useIsomorphicLayoutEffect = React.useEffect
  useIsomorphicLayoutEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>Create Now</title>
          <link rel="icon" href="/favicon.ico" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width"
          />
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

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
}
