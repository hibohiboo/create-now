import { createSlice, PayloadAction } from '@reduxjs/toolkit'
// import * as lostData from '~/data/lostrpg'
// import * as lostDataEn from '~/data/lostrpg-en'
// import {
//   initCamp,
//   useCamps,
//   useCampViewModel,
//   fetchCamps,
//   fetchCampsMore,
// } from './camp'
import * as card from './card'

export const init = {
  ...card.init,
}

// actions と reducers の定義
const hakoniwaModule = createSlice({
  name: 'hakoniwa',
  initialState: init,
  reducers: {
    ...card.reducers,
  },
})

export default hakoniwaModule
export type HakoniwaState = ReturnType<typeof hakoniwaModule.reducer>
export const actions = hakoniwaModule.actions
