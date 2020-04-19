import usePagination from 'firestore-pagination-hook'
import { ExtendedFirestoreInstance } from 'react-redux-firebase'
import fetch from 'isomorphic-unfetch'
import { Camp } from '~/@types/logtrpg'
import { FireStoreAPIResponse } from '~/@types/firestore'

export const initCamp: Camp = {
  name: '',
  facilities: [],
  freeWriting: '',
}

const getCamps = (firestore: ExtendedFirestoreInstance) => {
  return firestore.collection('systems').doc('lost').collection('camps')
}

export const getList = (firestore: ExtendedFirestoreInstance) =>
  usePagination(getCamps(firestore).orderBy('name', 'asc'), {
    limit: 2,
  })

export const getDataById = async (
  firestore: ExtendedFirestoreInstance,
  id: string,
) => {
  const doc = await getCamps(firestore).doc(id).get()
  console.log('doc', doc)
  if (doc.exists) {
    return doc.data() as Camp
  }
}

export const createCamp = (
  firestore: ExtendedFirestoreInstance,
  camp: Camp,
  uid: string,
) => {
  getCamps(firestore).add({ ...camp, uid })
}

export const updateCamp = (
  firestore: ExtendedFirestoreInstance,
  id: string,
  camp: Camp,
  uid: string,
) => {
  getCamps(firestore)
    .doc(id)
    .set({ ...camp, uid })
}

export const fetchCamp = async (id: string) => {
  const res: Response = await fetch(
    `https://firestore.googleapis.com/v1/projects/${process.env.FIREBASE_PROJECT_ID}/databases/(default)/documents/systems/lost/camps/${id}`,
  )
  const data: FireStoreAPIResponse = await res.json()
  const { name, uid } = data.fields
  const ret: Camp = {
    name: name.stringValue,
    uid: uid.stringValue,
  }
  return ret
}
