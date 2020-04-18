import { Camp } from '~/@types/logtrpg'
import { useFirestore } from 'react-redux-firebase'

const getCamps = () => {
  const firestore = useFirestore()
  return firestore.collection('systems').doc('lost').collection('camps')
}

export const createCamp = (camp: Camp, uid: string) => {
  getCamps().add({ ...camp, uid })
}

export const initCamp: Camp = {
  name: '',
  facilities: [],
  freeWriting: '',
}
