// import usePagination from 'firestore-pagination-hook'
import { Camp } from '~/store/modules/lostModule'
import firebase from 'firebase'
import { db } from '~/lib/firebase/initFirebase'

const getCamps = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('camps')
}

// export const getList = (firestore: ExtendedFirestoreInstance) =>
//   usePagination(getCamps(firestore).orderBy('name', 'asc'), {
//     limit: 10,
//   })

// export const getDataById = async (
//   firestore: ExtendedFirestoreInstance,
//   id: string,
// ) => {
//   const doc = await getCamps(firestore).doc(id).get()
//   console.log('doc', doc)
//   if (doc.exists) {
//     return doc.data() as Camp
//   }
// }

export const createCamp = async (camp: Camp, authUser: { uid: string }) => {
  const camps = getCamps(db)
  const { id } = await camps.doc()
  const { uid } = authUser
  await camps.doc(id).set({
    ...camp,
    uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
  return id
}

export const updateCamp = async (id: string, camp: Camp, uid: string) =>
  await getCamps(db)
    .doc(id)
    .set({
      ...camp,
      uid,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    })

export const canEdit = (authUser: { uid: string }, camp: Camp) =>
  authUser && authUser.uid === camp.uid

// export const deleteCamp = (
//   firestore: ExtendedFirestoreInstance,
//   id: string,
// ) => {
//   return getCamps(firestore).doc(id).delete()
// }
