import usePagination from 'firestore-pagination-hook'
import { ExtendedFirestoreInstance } from 'react-redux-firebase'
import { Camp } from '~/@types/logtrpg'
import firestoreApi from '~/utils/firestore/api'

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
  const { fetchApi, getStr } = firestoreApi
  const data = await fetchApi(`systems/lost/camps/${id}`)
  const { name, uid } = data.fields
  const ret: Camp = {
    name: getStr(name),
    uid: getStr(uid),
  }
  return ret
}
