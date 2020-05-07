// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { MemoListItem } from '~/store/modules/memoListModule'
import { db } from '~/lib/firebase/initFirebase'

const memoList = (firestore: firebase.firestore.Firestore) =>
  firestore.collection('others').doc('memolist')

export const readMemoListCollection = async (
  cn: string,
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
export const createMemo = async (
  cn: string,
  memo: MemoListItem,
  uid: string,
) => {
  const memos = memoList(db).collection(cn)
  const { id } = await memos.doc()
  await Promise.all([
    memos.doc(id).set({
      ...memo,
      uid,
    }),
  ])

  return id
}

export const updateMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db).collection(cn).doc(memo.id).set(memo)
export const deleteMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db).collection(cn).doc(memo.id).delete()
