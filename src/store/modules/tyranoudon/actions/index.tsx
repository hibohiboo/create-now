import { createAction } from '@reduxjs/toolkit'

export const addUdonariumMessage = createAction(
  'ADD_UDONARIUM_MESSAGE',
  (text: string) => ({ payload: { text } }),
)

export const changeName = createAction('CHANGE_CHARA_NAME', (text: string) => ({
  payload: { text },
}))

export const changeFace = createAction('CHANGE_CHARA_FACE', (text: string) => ({
  payload: { text },
}))

export default { addUdonariumMessage }
