import firebase from 'firebase/app'
const { Timestamp } = firebase.firestore
// createdAtがserializeではないオブジェクトなのでstringifyを経由することによりserialize化
export const toSerializeObject = (obj) => JSON.parse(JSON.stringify(obj))
export const toTimestamp = ({
  seconds,
  nanoseconds,
}: {
  seconds: number | string
  nanoseconds: number | string
}) => new Timestamp(Number(seconds), Number(nanoseconds))
