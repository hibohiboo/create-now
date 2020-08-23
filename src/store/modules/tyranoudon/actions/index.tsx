import { createAction } from '@reduxjs/toolkit'
import type { TyranoCharacter, TyranoPatchObject, Patch } from '../reducer'

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
const changeTyranoFontColor = createAction(
  'CHANGE_TYRANO_FONT_COLOR',
  (text: string) => ({
    payload: { text },
  }),
)
const changeTyranoFontSize = createAction(
  'CHANGE_TYRANO_FONT_SIZE',
  (n: number) => ({
    payload: { n },
  }),
)
const changeSceneName = createAction('CHANGE_SCENE_NAME', (text: string) => ({
  payload: { text },
}))
const changeCharacters = createAction(
  'CHANGE_CHARACTERS',
  (characters: TyranoCharacter[]) => ({
    payload: { characters },
  }),
)

const changeCharacterPositionBottom = createAction(
  'CHANGE_TYRANO_CHARACTER_POSITION_BOTTOM',
  (n: number) => ({
    payload: { n },
  }),
)
const changeTyranoCharaMessageAnimation = createAction(
  'CHANGE_TYRANO_MESSAGE_CHAR_ANIMATION',
  (text: string) => ({
    payload: { text },
  }),
)
const changeTyranoBackgroundImageUrl = createAction(
  'CHANGE_TYRANO_BACKGROUND_IMAGE_URL',
  (text: string) => ({
    payload: { text },
  }),
)

const changeBackgrounds = createAction(
  'CHANGE_TYRANO_BACKGROUNDS',
  (items: TyranoPatchObject[]) => ({
    payload: { items },
  }),
)
const changeSelectedBackground = createAction(
  'CHANGE_SELECTED_BACKGROUND',
  (item: TyranoPatchObject) => ({
    payload: { item },
  }),
)
const changeSelectedBackgroundPatch = createAction(
  'CHANGE_SELECTED_BACKGROUND_PATCH',
  (item: Patch) => ({
    payload: { item },
  }),
)

export default {
  addUdonariumMessage,
  changeName,
  changeFace,
  changeUdonariumBackgroundImage,
  changeTyranoBackgroundMethod,
  changeTyranoEffectTime,
  changeTyranoFontColor,
  changeTyranoFontSize,
  changeSceneName,
  changeCharacters,
  changeCharacterPositionBottom,
  changeTyranoCharaMessageAnimation,
  changeTyranoBackgroundImageUrl,
  changeBackgrounds,
  changeSelectedBackground,
  changeSelectedBackgroundPatch,
}
