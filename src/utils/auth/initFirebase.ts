import firebase from 'firebase/app'
import 'firebase/firestore'
import { createFirestoreInstance } from 'redux-firestore'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
}

export default () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
    firebase.firestore()
  }
}

// react-redux-firebase の プロバイダ設定
const rrfConfig = {}

export const rrfProps = {
  firebase,
  config: rrfConfig,
  createFirestoreInstance,
}
