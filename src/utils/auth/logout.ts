import { auth } from '~/lib/firebase/initFirebase'

export default async () => {
  try {
    await auth.signOut()
    // Sign-out successful.
    return true
  } catch (e) {
    console.error(e)
    return false
  }
}
