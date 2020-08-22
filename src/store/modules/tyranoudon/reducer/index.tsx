import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
import * as constants from '../constants'
import type {
  TyranoMethod,
  TyranoCharacterMessageAnimation,
} from '../constants'
const { addUdonariumMessage, changeName, changeFace } = actions
export interface TyranoCharacter {
  name: string
  jname: string
  faces: string[]
}

export interface TyranoUdon {
  text: string
  name: string
  face: string
  udonariumBackgroundImage: string
  tyranoBackgroundMethod: TyranoMethod
  tyranoEffectTime: number
  tyranoFontColor: string
  tyranoFontSize: number
  sceneName: string
  characters: TyranoCharacter[]
  characterPositionBottom: number
  characterMessageAnimation: TyranoCharacterMessageAnimation
}
const initialState = (): TyranoUdon => ({
  text: '',
  name: 'akane',
  face: ' ',
  udonariumBackgroundImage: 'forest.jpg',
  tyranoBackgroundMethod: 'fadeIn',
  tyranoEffectTime: 500,
  tyranoFontColor: '#ffffff',
  tyranoFontSize: 26,
  sceneName: 'ミドルフェイズ / シーン2 【シーンプレイヤー：あかね】',
  characters: [
    {
      jname: 'あかね',
      name: 'akane',
      faces: [' ', 'happy', 'doki', 'angry', 'sad'],
    },
    {
      jname: 'やまと',
      name: 'yamato',
      faces: [' '],
    },
  ],
  characterPositionBottom: -100,
  characterMessageAnimation: 'down',
})
export const init = initialState()

const reducer = createReducer(init, (builder) =>
  builder
    .addCase(addUdonariumMessage, (state, action) => {
      state.text = action.payload.text
    })
    .addCase(changeName, (state, action) => {
      state.name = action.payload.text
      state.face = ' '
    })
    .addCase(changeFace, (state, action) => {
      state.face = action.payload.text
    })
    .addCase(actions.changeUdonariumBackgroundImage, (state, actions) => {
      state.udonariumBackgroundImage = actions.payload.text
    })
    .addCase(actions.changeTyranoBackgroundMethod, (state, actions) => {
      if (constants.isBackgroundMethod(actions.payload.text)) {
        state.tyranoBackgroundMethod = actions.payload.text
      }
    })
    .addCase(actions.changeTyranoEffectTime, (state, actions) => {
      state.tyranoEffectTime = actions.payload.n
    })
    .addCase(actions.changeTyranoFontColor, (state, actions) => {
      state.tyranoFontColor = actions.payload.text
    })
    .addCase(actions.changeTyranoFontSize, (state, actions) => {
      state.tyranoFontSize = actions.payload.n
    })
    .addCase(actions.changeSceneName, (state, actions) => {
      state.sceneName = actions.payload.text
    })
    .addCase(actions.changeCharacters, (state, actions) => {
      state.characters = actions.payload.characters
    })
    .addCase(actions.changeCharacterPositionBottom, (state, actions) => {
      state.characterPositionBottom = actions.payload.n
    })
    .addCase(actions.changeTyranoCharaMessageAnimation, (state, actions) => {
      if (constants.isTyranoCharacterMessageAnimation(actions.payload.text))
        state.characterMessageAnimation = actions.payload.text
    }),
)

export default reducer
