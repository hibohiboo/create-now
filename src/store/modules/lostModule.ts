import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppThunk } from '~/store/rootState'
import { getCamp } from '~/api/firestoreAPI'

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
  error: string | null
}

export const init: LostState = {
  camp: null,
  camps: [],
  error: null,
}

// actions と reducers の定義
const campModule = createSlice({
  name: 'camp',
  initialState: init,
  reducers: {
    setCamp: (state, action: PayloadAction<Camp>) => {
      state.camp = action.payload
    },
    setError: (state, action: PayloadAction<Camp>) => {
      state.camp = action.payload
    },
  },
})

export const useCamp = () => {
  return useSelector(
    (state: { lost: ReturnType<typeof campModule.reducer> }) => state.lost.camp,
  )
}

export default campModule

// actions
export const { setCamp, setError } = campModule.actions

// thunk
export const fetchCamp = (id: string): AppThunk => async (dispatch) => {
  try {
    const camp = await getCamp(id)
    dispatch(setCamp(camp))
  } catch (err) {
    dispatch(setError(err.toString()))
  }
}
