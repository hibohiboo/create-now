import { createReducer } from '@reduxjs/toolkit'
import { addUdonariumMessage } from '../actions'

export interface TyranoUdon {
  text: string
}
export const initialState = (): TyranoUdon => ({ text: '' })

const reducer = createReducer(initialState(), (builder) =>
  builder.addCase(addUdonariumMessage, (state, action) => {
    state.text = action.payload.text
  }),
)

export default reducer
