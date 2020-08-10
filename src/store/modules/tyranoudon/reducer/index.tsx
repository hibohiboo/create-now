import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
const { addUdonariumMessage, changeName, changeFace } = actions

export interface TyranoUdon {
  text: string
  name: string
  face: string
  udonariumBackgroundImage: string
}
export const initialState = (): TyranoUdon => ({
  text: '',
  name: 'あかね',
  face: ' ',
  udonariumBackgroundImage: './assets/images/BG10a_80.jpg',
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
    }),
)

export default reducer
