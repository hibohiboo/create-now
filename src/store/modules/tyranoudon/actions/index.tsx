import { createAction } from '@reduxjs/toolkit'

const addUdonariumMessage = createAction(
  'ADD_UDONARIUM_MESSAGE',
  (text: string) => ({ payload: { text } }),
)

const changeName = createAction('CHANGE_CHARA_NAME', (text: string) => ({
  payload: { text },
}))

const changeFace = createAction('CHANGE_CHARA_FACE', (text: string) => ({
  payload: { text },
}))

const changeUdonariumBackgroundImage = createAction(
  'CHANGE_UDON_BG_IMAGE',
  (text: string) => ({
    payload: { text },
  }),
)
const changeTyranoName = createAction('CHANGE_TYRANO_NAME', (text: string) => ({
  payload: { text },
}))
export default {
  addUdonariumMessage,
  changeName,
  changeFace,
  changeUdonariumBackgroundImage,
  changeTyranoName,
}
