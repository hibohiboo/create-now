// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { Camp } from '~/store/modules/lostModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'
import { updateImage, deleteImage } from '~/firebaseStorage/image'

const { Timestamp } = firebase.firestore

const memoList = (firestore: firebase.firestore.Firestore) =>
  firestore.collection('others').doc('memolist')

export const readMemoListCollection = async (
  cn: string,
  lastVisible: string | null = null,
  limit = 10,
  searchName = '',
) => {
  // 複合インデックスを作っていないので、orderBy出来るのは一つ
  let query = memoList(db).collection(cn).orderBy('point', 'desc')

  query = query.limit(limit)
  const querySnapshot = await query.get()
  const ret: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    ret.push({
      ...data,
      id: doc.id,
    })
  })

  return ret
}

export const readMemoList = async () => {
  const ref = await memoList(db).get()

  return ref.data()
}
