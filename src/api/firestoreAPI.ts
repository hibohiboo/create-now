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

const getStr = (obj): string | undefined => (obj ? obj.stringValue : null)
const getInt = (obj) =>
  obj && isNaN(Number(obj.integerValue)) ? 0 : Number(obj.integerValue)
const getTimestamp = (obj) => (obj ? obj.timestampValue : null)
const getArray = (obj, decoder) =>
  obj && obj.arrayValue && obj.arrayValue.values
    ? obj.arrayValue.values.map(({ mapValue }) => decoder(mapValue.fields))
    : []

// LOSTRPG
export const getCamp = async (id: string) => {
  const data = await fetchFromFirestore(`systems/lost/camps/${id}`)

  const {
    name,
    uid,
    playerName,
    createdAt,
    updatedAt,
    facilities,
    freeWriting,
    imageUrl,
  } = data.fields
  const ret: lost.Camp = {
    name: getStr(name),
    uid: getStr(uid),
    playerName: getStr(playerName),
    createdAt: getTimestamp(createdAt),
    updatedAt: getTimestamp(updatedAt),
    facilities: getArray(facilities, (item) => ({
      name: getStr(item.name),
      type: getStr(item.type),
      specialty: getStr(item.specialty),
      level: getInt(item.level),
      effect: getStr(item.effect),
    })),
    freeWriting: getStr(freeWriting),
    imageUrl: getStr(imageUrl),
  }
  return ret
}
