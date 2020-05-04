// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { Character } from '~/store/modules/lostModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject } from '~/firestore/utils'
import { updateImage, deleteImage } from '~/firebaseStorage/image'

const { Timestamp } = firebase.firestore

const getCharacters = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('characters')
}
const getCharacterNames = (firestore: firebase.firestore.Firestore) => {
  return firestore
    .collection('systems')
    .doc('lost')
    .collection('characterNames')
}

export const createCharacter = async (
  character: Character,
  authUser: { uid: string },
  file?: File,
) => {
  const characters = getCharacters(db)
  const characterNames = getCharacterNames(db)
  const { id } = await characters.doc()
  const { uid } = authUser
  let url = ''
  if (file) {
    const path = `${uid}/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    characters.doc(id).set({
      ...character,
      uid,
      imageUrl: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    characterNames.doc(id).set({
      name: character.name,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  ])

  return id
}

export const getCharacter = async (id: string) => {
  return (await getCharacters(db).doc(id).get()).data() as Character
}

export const updateCharacter = async (
  id: string,
  character: Character,
  uid: string,
  file?: File,
) => {
  let url = character.imageUrl
  if (file) {
    const path = `${uid}/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    getCharacters(db)
      .doc(id)
      .set({
        ...character,
        uid,
        imageUrl: url,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    getCharacterNames(db).doc(id).set({
      name: character.name,
      uid,
      createdAt: character.createdAt,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  ])
}
export const canEdit = (authUser: { uid: string }, character: Character) =>
  authUser && authUser.uid === character.uid

export const deleteCharacter = async (id: string, uid: string) => {
  try {
    const path = `${uid}/${id}.`
    await deleteImage(path)
  } catch (e) {
    console.log(e)
  }

  await Promise.all([
    getCharacters(db).doc(id).delete(),
    getCharacterNames(db).doc(id).delete(),
  ])
}

export const readCharacters = async (
  lastVisible: string | null = null,
  limit = 10,
  searchName = '',
) => {
  let query = !searchName
    ? getCharacterNames(db).orderBy('createdAt', 'desc')
    : getCharacterNames(db)
        .orderBy('name')
        .startAt(searchName)
        .endAt(searchName + '\uf8ff')
  const splitter = ':'

  if (lastVisible && !searchName) {
    const [seconds, nanoseconds] = lastVisible.split(splitter)
    const timestamp = new Timestamp(Number(seconds), Number(nanoseconds))
    query = query.startAfter(timestamp)
  }
  query = query.limit(limit)
  const querySnapshot = await query.get()
  const len = querySnapshot.docs.length
  const next = querySnapshot.docs[len - 1]?.data()
  const characters: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    characters.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })
  if (len < limit) {
    // limitより少なければ、次のデータはないとする ... limitと同値の時は次へが表示されてしまう
    return { characters, next: '', hasMore: false }
  }
  return {
    characters,
    next: `${next.createdAt.seconds}${splitter}${next.createdAt.nanoseconds}`,
    hasMore: true,
  }
}