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
const getInt = ({ integerValue }: { integerValue: string }) =>
  isNaN(Number(integerValue)) ? 0 : Number(integerValue)
const getTimestamp = ({ timestampValue }: { timestampValue: Date }) =>
  timestampValue
const getArray = ({ arrayValue }, decoder) =>
  arrayValue.values.map(({ mapValue }) => decoder(mapValue.fields))

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
  }
  return ret
}
