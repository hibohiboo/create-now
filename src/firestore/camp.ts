// import usePagination from 'firestore-pagination-hook'
import { Camp } from '~/store/modules/lostModule'
import firebase from 'firebase'
import { db } from '~/lib/firebase/initFirebase'

const { Timestamp } = firebase.firestore

const getCamps = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('camps')
}

const toSerializeObject = (obj) => JSON.parse(JSON.stringify(obj))

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

export const readCamps = async (
  lastVisible: string | null = null,
  limit = 10,
) => {
  let query = getCamps(db).orderBy('createdAt', 'desc').limit(limit)
  if (lastVisible !== null) {
    query.startAfter(lastVisible)
  }
  const splitter = ':'

  if (lastVisible) {
    const [seconds, nanoseconds] = lastVisible.split(splitter)
    const timestamp = new Timestamp(Number(seconds), Number(nanoseconds))
    query = query.startAfter(timestamp)
  }
  const querySnapshot = await query.get()
  const len = querySnapshot.docs.length
  const next = querySnapshot.docs[len - 1].data()
  const camps: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    camps.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })
  if (len < limit) {
    // limitより少なければ、次のデータはないとする ... limitと同値の時は次へが表示されてしまう
    return { camps, next: '', hasMore: false }
  }
  return {
    camps,
    next: `${next.createdAt.seconds}${splitter}${next.createdAt.nanoseconds}`,
    hasMore: true,
  }
}
