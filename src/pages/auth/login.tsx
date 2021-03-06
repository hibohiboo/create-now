import React from 'react'
import firebase from 'firebase/app'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Router from 'next/router'
import { NextPage } from 'next'
import { Container, Box } from '@material-ui/core'
import { auth } from '~/lib/firebase/initFirebase'
import Footer from '../../components/organisms/common/Footer'

const SignInScreen: NextPage = () => {
  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: (authResult, redirectUrl = '/') => {
        Router.push(redirectUrl)
        // Avoid redirects after sign-in.
        return false
      },
    },
  }

  return (
    <Container>
      <Box height="100vh">
        <h1>ログイン</h1>
        <div style={{ maxWidth: '600px' }}>
          <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />
        </div>
      </Box>
      <Footer />
    </Container>
  )
}

export default SignInScreen
