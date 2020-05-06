import firebase from 'firebase/app'
const { Timestamp } = firebase.firestore
export const toSerializeObject = (obj) => JSON.parse(JSON.stringify(obj))
export const toTimestamp = ({
  seconds,
  nanoseconds,
}: {
  seconds: number | string
  nanoseconds: number | string
}) => new Timestamp(Number(seconds), Number(nanoseconds))
