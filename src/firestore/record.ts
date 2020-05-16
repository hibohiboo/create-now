// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import type { Record } from '~/store/modules/lostModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'

const getRecords = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('records')
}

const getCharactersRecords = (firestore: firebase.firestore.Firestore) => {
  return firestore
    .collection('systems')
    .doc('lost')
    .collection('charactersRecords')
}

const updateCharactersRecords = async (
  firestore: firebase.firestore.Firestore,
  characterId: string,
  recordId: string,
  scenarioTitle: string,
  trophy: string,
  exp: number,
  uid: string,
) => {
  if (characterId) {
    return await getCharactersRecords(firestore).doc(recordId).set({
      recordId,
      characterId,
      scenarioTitle,
      trophy,
      exp,
      uid,
    })
  }
  try {
    return await getCharactersRecords(firestore).doc(recordId).delete()
  } catch (e) {
    console.log(e)
  }
}

export const createRecord = async (
  record: Record,
  authUser: { uid: string },
) => {
  const records = getRecords(db)
  const { id } = await records.doc()
  const { uid } = authUser
  await Promise.all([
    records.doc(id).set({
      ...record,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    updateCharactersRecords(
      db,
      record.characterId,
      id,
      record.scenarioTitle,
      record.trophy,
      record.exp,
      uid,
    ),
  ])

  return id
}

export const getRecord = async (id: string) => {
  const data = (await getRecords(db).doc(id).get()).data()
  if (!data) return null

  return { ...toSerializeObject(data), id } as Record
}

export const updateRecord = async (id: string, record: Record, uid: string) => {
  console.log('update', record)
  await Promise.all([
    getRecords(db)
      .doc(id)
      .set({
        ...record,
        uid,
        createdAt: toTimestamp(record.createdAt),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    updateCharactersRecords(
      db,
      record.characterId,
      id,
      record.scenarioTitle,
      record.trophy,
      record.exp,
      uid,
    ),
  ])
}
export const canEdit = (authUser: { uid: string }, record: Record) =>
  authUser && authUser.uid === record.uid

export const deleteRecord = async (id: string, uid: string) => {
  await Promise.all([
    getRecords(db).doc(id).delete(),
    getCharactersRecords(db).doc(id).delete(),
  ])
}

export const readCharactersRecords = async (id: string) => {
  const querySnapshot = await getCharactersRecords(db)
    .where('characterId', '==', id)
    .get()
  const ret = []
  querySnapshot.forEach((doc) => ret.push(doc.data()))
  return ret
}
