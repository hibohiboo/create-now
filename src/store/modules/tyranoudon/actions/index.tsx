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
const changeTyranoBackgroundMethod = createAction(
  'CHANGE_TYRANO_BG_METHOD',
  (text: string) => ({
    payload: { text },
  }),
)
const changeTyranoEffectTime = createAction(
  'CHANGE_TYRANO_EFFECT_TIME',
  (n: number) => ({
    payload: { n },
  }),
)
export default {
  addUdonariumMessage,
  changeName,
  changeFace,
  changeUdonariumBackgroundImage,
  changeTyranoBackgroundMethod,
  changeTyranoEffectTime,
}
