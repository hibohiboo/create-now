// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'

const getCollection = (name: string) => {
  return db.collection('systems').doc('drift').collection(name)
}
interface Comment {
  user: User
  content: string
  postTime: number
}
interface User {
  uid: string
  name: string
}
const COMMENTS = 'comments'
export const addComment = async (
  comment: Comment,
  { uid }: { uid: string },
) => {
  const comments = getCollection(COMMENTS)
  const { id } = await comments.doc()
  comments.doc(id).set({
    ...comment,
    uid,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
  })
}
export const readComments = async (
  lastVisible: string | null = null,
  limit = 10,
) => {
  // 複合インデックスを作っていないので、orderBy出来るのは一つ
  let query = getCollection(COMMENTS).orderBy('createdAt', 'desc')

  const splitter = ':'

  // 次の〇件は検索時には現状使用不可
  if (lastVisible) {
    const [seconds, nanoseconds] = lastVisible.split(splitter)
    const timestamp = toTimestamp({ seconds, nanoseconds })
    query = query.startAfter(timestamp)
  }
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const len = querySnapshot.docs.length
  const next = querySnapshot.docs[len - 1]?.data()
  const comments: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    comments.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })
  if (len < limit) {
    // limitより少なければ、次のデータはないとする ... limitと同値の時は次へが表示されてしまう
    return { comments, next: '', hasMore: false }
  }
  return {
    comments,
    next: `${next.createdAt.seconds}${splitter}${next.createdAt.nanoseconds}`,
    hasMore: true,
  }
}
