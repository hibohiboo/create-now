import { createAction } from '@reduxjs/toolkit'

export const addUdonariumMessage = createAction(
  'ADD_UDONARIUM_MESSAGE',
  (text: string) => ({ payload: { text } }),
)

export default { addUdonariumMessage }
