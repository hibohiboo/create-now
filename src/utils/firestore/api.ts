import fetch from 'isomorphic-unfetch'
import { FireStoreAPIResponse } from '~/@types/firestore'

export const fetchApi = async (path: string) => {
  const url = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`
  const res: Response = await fetch(url)
  const data: FireStoreAPIResponse = await res.json()
  return data
}

export const getStr = ({ stringValue }: { stringValue: string }): string =>
  stringValue

export default {
  fetchApi,
  getStr,
}
