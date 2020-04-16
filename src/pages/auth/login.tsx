import React from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Footer from '../../components/organisms/common/Footer'
import Link from '../../components/atoms/mui/Link'
import { Container, Box } from '@material-ui/core'

class SignInScreen extends React.Component {
  // The component's Local state.
  state = {
    isSignedIn: false, // Local signed-in state.
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.TwitterAuthProvider.PROVIDER_ID],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false,
    },
  }
  unregisterAuthObserver: firebase.Unsubscribe

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    this.unregisterAuthObserver = firebase
      .auth()
      .onAuthStateChanged((user) => this.setState({ isSignedIn: !!user }))
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver()
  }

  render() {
    if (!this.state.isSignedIn) {
      return (
        <Container>
          <Box height="100vh">
            <h1>ログイン</h1>
            <div style={{ maxWidth: '600px' }}>
              <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
              />
            </div>
          </Box>
          <Footer />
        </Container>
      )
    }
    return (
      <Container>
        <Box height="100vh">
          <h1>ログイン成功</h1>
          <p> ログインユーザ： {firebase.auth().currentUser.displayName} </p>
          <p>
            <Link href="/"> トップへ </Link>
          </p>
        </Box>
        {/* <a onClick={() => firebase.auth().signOut()}>Sign-out</a> */}
        <Footer />
      </Container>
    )
  }
}
export default SignInScreen
