import fetch from 'isomorphic-unfetch'
import { FireStoreAPIResponse } from '~/@types/firestore'
import * as lost from '~/store/modules/lostModule'

// common utility
const fetchFromFirestore = async (path: string) => {
  const url = `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/${path}`
  const res: Response = await fetch(url)
  const data: FireStoreAPIResponse = await res.json()
  return data
}

const getStr = ({
  stringValue,
}: { stringValue: string } | undefined): string | undefined => stringValue

// LOSTRPG
export const getCamp = async (id: string) => {
  const data = await fetchFromFirestore(`systems/lost/camps/${id}`)
  const { name, uid, playerName } = data.fields
  const ret: lost.Camp = {
    name: getStr(name),
    uid: getStr(uid),
    playerName: getStr(playerName),
  }
  return ret
}
