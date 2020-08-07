import { createReducer } from '@reduxjs/toolkit'
import { addUdonariumMessage, changeName, changeFace } from '../actions'

export interface TyranoUdon {
  text: string
  name: string
  face: string
}
export const initialState = (): TyranoUdon => ({
  text: '',
  name: 'あかね',
  face: ' ',
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
    }),
)

export default reducer
