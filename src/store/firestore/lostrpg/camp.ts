import usePagination from 'firestore-pagination-hook'
import { ExtendedFirestoreInstance } from 'react-redux-firebase'
import { Camp } from '~/@types/logtrpg'
import firestoreApi from '~/utils/firestore/api'
import firebase from 'firebase'

export const initCamp: Camp = {
  name: '',
  facilities: [],
  freeWriting: '',
  playerName: '',
}

const getCamps = (firestore: ExtendedFirestoreInstance) => {
  return firestore.collection('systems').doc('lost').collection('camps')
}

export const getList = (firestore: ExtendedFirestoreInstance) =>
  usePagination(getCamps(firestore).orderBy('name', 'asc'), {
    limit: 10,
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

export const createCamp = async (
  firestore: ExtendedFirestoreInstance,
  camp: Camp,
  authUser: firebase.User,
) => {
  const { id } = await getCamps(firestore).doc()
  const { uid } = authUser
  await getCamps(firestore)
    .doc(id)
    .set({
      ...camp,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })
  return id
}

export const updateCamp = async (
  firestore: ExtendedFirestoreInstance,
  id: string,
  camp: Camp,
  uid: string,
) =>
  await getCamps(firestore)
    .doc(id)
    .set({
      ...camp,
      uid,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

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

export const canEdit = (authUser: { uid: string }, camp: Camp) =>
  authUser && authUser.uid === camp.uid

export const deleteCamp = (
  firestore: ExtendedFirestoreInstance,
  id: string,
) => {
  return getCamps(firestore).doc(id).delete()
}
