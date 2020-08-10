import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
import { isBackgroundMethod } from '../constants'
const { addUdonariumMessage, changeName, changeFace } = actions

export interface TyranoUdon {
  text: string
  name: string
  face: string
  udonariumBackgroundImage: string
  tyranoBackgroundMethod: string
  tyranoEffectTime: number
  tyranoFontColor: string
  tyranoFontSize: number
  sceneName: string
}
export const initialState = (): TyranoUdon => ({
  text: '',
  name: 'akane',
  face: ' ',
  udonariumBackgroundImage: 'forest.jpg',
  tyranoBackgroundMethod: 'fadeIn',
  tyranoEffectTime: 1000,
  tyranoFontColor: '#ffffff',
  tyranoFontSize: 26,
  sceneName: 'ミドルフェイス / シーン2 【シーンプレイヤー：あかね】',
})

const reducer = createReducer(initialState(), (builder) =>
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
      if (isBackgroundMethod(actions.payload.text)) {
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
    }),
)

export default reducer
