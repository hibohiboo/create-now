// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { Boss } from '~/store/modules/lostModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'
import { updateImage, deleteImage } from '~/firebaseStorage/image'

const getBosses = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('bosses')
}
const getBossNames = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('bossNames')
}

export const createBoss = async (
  boss: Boss,
  authUser: { uid: string },
  file?: File,
) => {
  const bosses = getBosses(db)
  const bossNames = getBossNames(db)
  const { id } = await bosses.doc()
  const { uid } = authUser
  let url = ''
  if (file) {
    const path = `${uid}/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    bosses.doc(id).set({
      ...boss,
      uid,
      imageUrl: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    bossNames.doc(id).set({
      name: boss.name,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  ])

  return id
}

export const getBoss = async (id: string) => {
  const data = (await getBosses(db).doc(id).get()).data()
  if (!data) return null
  return toSerializeObject(data) as Boss
}

export const updateBoss = async (
  id: string,
  boss: Boss,
  uid: string,
  file?: File,
) => {
  let url = boss.imageUrl
  if (file) {
    const path = `${uid}/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    getBosses(db)
      .doc(id)
      .set({
        ...boss,
        uid,
        imageUrl: url,
        createdAt: toTimestamp(boss.createdAt),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    getBossNames(db)
      .doc(id)
      .set({
        name: boss.name,
        uid,
        createdAt: toTimestamp(boss.createdAt),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    updateCampsBosses(db, boss.campId, boss.campName, id, boss.name, uid),
  ])
}
export const canEdit = (authUser: { uid: string }, boss: Boss) =>
  authUser && authUser.uid === boss.uid

export const deleteBoss = async (id: string, uid: string) => {
  try {
    const path = `${uid}/${id}.`
    await deleteImage(path)
  } catch (e) {
    console.log(e)
  }

  await Promise.all([
    getBosses(db).doc(id).delete(),
    getBossNames(db).doc(id).delete(),
    await (async () => {
      const collection = db
        .collection('systems')
        .doc('lost')
        .collection('bossesRecords')
      const list = await collection.where('bossId', '==', id).get()
      list.forEach((doc) => {
        collection.doc(doc.id).delete()
        db.collection('systems')
          .doc('lost')
          .collection('records')
          .doc(doc.id)
          .delete()
      })
    })(),
  ])
}

export const readBosses = async (
  lastVisible: string | null = null,
  limit = 10,
  searchName = '',
) => {
  let query = !searchName
    ? getBossNames(db).orderBy('createdAt', 'desc')
    : getBossNames(db)
        .orderBy('name')
        .startAt(searchName)
        .endAt(searchName + '\uf8ff')
  const splitter = ':'

  if (lastVisible && !searchName) {
    const [seconds, nanoseconds] = lastVisible.split(splitter)
    const timestamp = toTimestamp({ seconds, nanoseconds })
    query = query.startAfter(timestamp)
  }
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const len = querySnapshot.docs.length
  const next = querySnapshot.docs[len - 1]?.data()
  const bosses: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    bosses.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })
  if (len < limit) {
    // limitより少なければ、次のデータはないとする ... limitと同値の時は次へが表示されてしまう
    return { bosses, next: '', hasMore: false }
  }
  return {
    bosses,
    next: `${next.createdAt.seconds}${splitter}${next.createdAt.nanoseconds}`,
    hasMore: true,
  }
}

export const readCampsBosses = async (id: string) => {
  const querySnapshot = await getCampsBosses(db).where('campId', '==', id).get()
  const ret = []
  querySnapshot.forEach((doc) => ret.push(doc.data()))
  return ret
}
