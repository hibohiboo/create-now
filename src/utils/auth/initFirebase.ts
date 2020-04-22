import firebase from 'firebase/app'
import 'firebase/firestore'
import { createFirestoreInstance } from 'redux-firestore'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
}
let db: firebase.firestore.Firestore
const init = () => {
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
    db = firebase.firestore()
  }
}

export default init

export const getFirestore = () => {
  init()
  return db
}
// react-redux-firebase の プロバイダ設定
const rrfConfig = {}

export const rrfProps = {
  firebase,
  config: rrfConfig,
  createFirestoreInstance,
}
