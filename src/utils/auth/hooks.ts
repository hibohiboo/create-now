import React, { useEffect, useState } from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import initFirebase from './initFirebase'
import { setSession } from './firebaseSessionHandler'
import { createAuthUserInfo } from './user'

initFirebase()

// Defaults to empty AuthUserInfo object.
export const AuthUserInfoContext = React.createContext(createAuthUserInfo())

export const useAuthUserInfo = () => {
  return React.useContext(AuthUserInfoContext)
}

export const useFirebaseAuth = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser
    return {
      initializing: !user,
      user,
    }
  })

  const onChange = (user: firebase.User | null) => {
    //setState({ initializing: false, user })

    // Call server to update session.
    setSession(user)
  }

  useEffect(() => {
    // Listen for auth state changes.
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange)

    // Unsubscribe to the listener when unmounting.
    return () => unsubscribe()
  }, [])

  return state
}
