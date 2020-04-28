import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export interface Facility {
  name: string
  type: string
  speciality: string
  level: number
  effect: string
}

export interface Camp {
  name: string
  facilities?: Facility[]
  freeWriting?: string
  playerName?: string
  uid?: string
  twitterId?: string
  createdAt?: any
  updatedAt?: any
}

export const initCamp = {
  name: '',
  facilities: [],
  freeWriting: '',
  playerName: '',
}

type LostState = {
  camp: Camp | null
  camps: Camp[]
}

export const init: LostState = {
  camp: null,
  camps: [],
}

// actions と reducers の定義
const campModule = createSlice({
  name: 'camp',
  initialState: init,
  reducers: {
    update: (state, action: PayloadAction<Camp>) => {
      action.payload
    },
  },
})

export const useCamp = () => {
  return useSelector(
    (state: { lost: ReturnType<typeof campModule.reducer> }) => state.lost.camp,
  )
}

export default campModule

// thunk
