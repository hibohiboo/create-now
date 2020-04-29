import { get } from 'lodash'
import authModule from '~/store/modules/authModule'

export default (ComposedComponent: any) => {
  const WithAuthUserComponent = (props: any) => {
    const { ...otherProps } = props
    return <ComposedComponent {...otherProps} />
  }

  WithAuthUserComponent.getInitialProps = async (ctx) => {
    const { createServerSide, createClientSide } = authModule.actions
    if (typeof window === 'undefined') {
      const { req, res } = ctx
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { addSession } = require('../middleware/cookieSession')
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

    // Evaluate the composed component's getInitialProps().
    let composedInitialProps = {}
    if (ComposedComponent.getInitialProps) {
      composedInitialProps = await ComposedComponent.getInitialProps(ctx)
    }

    return {
      pageProps: {
        // Call page-level getInitialProps
        ...composedInitialProps,
        // Some custom thing for all pages
        pathname: ctx.pathname,
      },
    }
  }

  return WithAuthUserComponent
}
