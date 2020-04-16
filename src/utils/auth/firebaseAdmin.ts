import * as admin from 'firebase-admin'

export const verifyIdToken = (token: string) => {
  if (!admin.apps.length) {
    const cert = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY,
    }
    admin.initializeApp({
      credential: admin.credential.cert(cert),
    })
  }

  return admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      throw error
    })
}
