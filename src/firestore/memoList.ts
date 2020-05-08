// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { MemoListItem } from '~/store/modules/memoListModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'

const memoList = (firestore: firebase.firestore.Firestore) =>
  firestore.collection('others').doc('memolist')

export const readMemoListCollection = async (
  cn: string,
  limit = 10,
  searchTags: string[] = [],
  isOrderCreated = false,
) => {
  let query = isOrderCreated
    ? memoList(db).collection(cn).orderBy('createdAt', 'desc')
    : memoList(db).collection(cn).orderBy('point', 'desc')
  console.log('search', searchTags)
  if (searchTags.length !== 0) {
    // or条件 https://blog.nabettu.com/entry/array-contains-any
    // query = query.where('tags', 'array-contains-any', searchTags)
    const target = searchTags.pop()
    query = query.where('tags', 'array-contains', target)
  }
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const ret: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()

    // queryでは1つしか絞り込めないので、2つ以上の絞り込みは取得結果から絞り込む
    let isNotContain = false
    searchTags.forEach((tag) => {
      if (!data.tags.includes(tag)) isNotContain = true
    })
    if (isNotContain) return
    ret.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
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
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  ])

  return id
}

export const updateMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db)
    .collection(cn)
    .doc(memo.id)
    .set({ ...memo, createdAt: toTimestamp(memo.createdAt) })
export const deleteMemo = async (cn: string, memo: MemoListItem) =>
  await memoList(db).collection(cn).doc(memo.id).delete()
