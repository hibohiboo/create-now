import 'firebase/auth'
import { firebaseReducer } from 'react-redux-firebase'
import { useSelector } from 'react-redux'
import initFirebase from '~/utils/auth/initFirebase'

initFirebase()

export default {
  reducer: firebaseReducer,
}

export const getAuth = (): firebase.User | null => {
  const auth = useSelector((state: any) => state.firebase.auth)
  if (auth.isEmpty) return null
  return auth
}
