import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export const db = firebase.firestore()
export const auth = firebase.auth()
export const storage = firebase.storage()
