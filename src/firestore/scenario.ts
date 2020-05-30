// import usePagination from 'firestore-pagination-hook'
import firebase from 'firebase/app'
import { Scenario } from '~/store/modules/lostModule'
import { db } from '~/lib/firebase/initFirebase'
import { toSerializeObject, toTimestamp } from '~/firestore/utils'
import { updateImage, deleteImage } from '~/firebaseStorage/image'

const getScenarios = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('scenarios')
}
const getScenarioNames = (firestore: firebase.firestore.Firestore) => {
  return firestore.collection('systems').doc('lost').collection('scenarioNames')
}

export const createScenario = async (
  scenario: Scenario,
  authUser: { uid: string },
  file?: File,
) => {
  const scenarios = getScenarios(db)
  const scenarioNames = getScenarioNames(db)
  const { id } = await scenarios.doc()
  const { uid } = authUser
  let url = ''
  if (file) {
    const path = `${uid}/scenarios/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    scenarios.doc(id).set({
      ...scenario,
      uid,
      imageUrl: url,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
    scenarioNames.doc(id).set({
      name: scenario.name,
      isPublish: scenario.isPublish,
      uid,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
    }),
  ])

  return id
}

export const getScenario = async (id: string) => {
  const data = (await getScenarios(db).doc(id).get()).data()
  if (!data) return null
  return toSerializeObject(data) as Scenario
}

export const updateScenario = async (
  id: string,
  scenario: Scenario,
  uid: string,
  file?: File,
) => {
  let url = scenario.imageUrl

  if (file) {
    const path = `${uid}/scenarios/${id}`
    url = await updateImage(path, file)
  }
  await Promise.all([
    getScenarios(db)
      .doc(id)
      .set({
        ...scenario,
        uid,
        imageUrl: url,
        createdAt: toTimestamp(scenario.createdAt),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
    getScenarioNames(db)
      .doc(id)
      .set({
        name: scenario.name,
        uid,
        isPublish: scenario.isPublish,
        createdAt: toTimestamp(scenario.createdAt),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      }),
  ])
}
export const canEdit = (authUser: { uid: string }, scenario: Scenario) =>
  authUser && authUser.uid === scenario.uid

export const deleteScenario = async (id: string, uid: string) => {
  try {
    const path = `${uid}/${id}.`
    await deleteImage(path)
  } catch (e) {
    console.log(e)
  }

  await Promise.all([
    getScenarios(db).doc(id).delete(),
    getScenarioNames(db).doc(id).delete(),
    await (async () => {
      const collection = db
        .collection('systems')
        .doc('lost')
        .collection('scenariosRecords')
      const list = await collection.where('scenarioId', '==', id).get()
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

export const readScenarios = async (
  lastVisible: string | null = null,
  limit = 10,
  searchName = '',
) => {
  let query = !searchName
    ? getScenarioNames(db)
        .where('isPublish', '==', true)
        .orderBy('createdAt', 'desc')
    : getScenarioNames(db)
        .where('isPublish', '==', true)
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
  const scenarios: any[] = []
  querySnapshot.forEach((doc) => {
    const data = doc.data()
    scenarios.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })
  if (len < limit) {
    // limitより少なければ、次のデータはないとする ... limitと同値の時は次へが表示されてしまう
    return { scenarios, next: '', hasMore: false }
  }
  return {
    scenarios,
    next: `${next.createdAt.seconds}${splitter}${next.createdAt.nanoseconds}`,
    hasMore: true,
  }
}
export const readPrivateScenarios = async (uid: string) => {
  const querySnapshot = await getScenarioNames(db)
    .where('isPublish', '==', false)
    .where('uid', '==', uid)
    .orderBy('createdAt', 'desc')
    .get()

  const scenarios: any[] = []

  querySnapshot.forEach((doc) => {
    const data = doc.data()
    scenarios.push({
      ...data,
      createdAt: toSerializeObject(data.createdAt),
      updatedAt: toSerializeObject(data.updatedAt),
      id: doc.id,
    })
  })

  return scenarios
}
