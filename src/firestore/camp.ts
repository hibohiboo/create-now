// import usePagination from 'firestore-pagination-hook'
import { Camp } from '~/store/modules/lostModule'
import firebase from 'firebase'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject } from '~/firestore/utils'
const { Timestamp } = firebase.firestore

const getCamps = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('camps')
}

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

export const getCamp = async (id: string) => {
  return (await getCamps(db).doc(id).get()).data() as Camp
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

export const deleteCamp = (id: string) => {
  return getCamps(db).doc(id).delete()
}

export const readCamps = async (
  lastVisible: string | null = null,
  limit = 10,
  searchName = '',
) => {
  // 複合インデックスを作っていないので、orderBy出来るのは一つ
  let query = !searchName
    ? getCamps(db).orderBy('createdAt', 'desc')
    : getCamps(db)
        .orderBy('name')
        .startAt(searchName)
        .endAt(searchName + '\uf8ff')
  const splitter = ':'

  // 次の〇件は検索時には現状使用不可
  if (lastVisible && !searchName) {
    const [seconds, nanoseconds] = lastVisible.split(splitter)
    const timestamp = new Timestamp(Number(seconds), Number(nanoseconds))
    query = query.startAfter(timestamp)
  }
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const len = querySnapshot.docs.length
  const next = querySnapshot.docs[len - 1]?.data()
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
