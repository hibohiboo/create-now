import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'

export interface Facility {
  name: string
  type: string
  speciality: string
  level: number
  effect: string
}

export interface Camp {
  name: string
  id?: string
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
  createdAt: '',
  updatedAt: '',
  twitterId: '',
  uid: '',
}

type LostState = {
  camp: Camp | null
  camps: Camp[]
  campsPagination: PaginationState
  error: string | null
}

type PaginationState = {
  hasMore: boolean
  lastLoaded: string | null
  limit: number
  loading: boolean
}
const initialState = {
  hasMore: false,
  limit: 20,
  lastLoaded: null,
  loading: true,
}

export const init: LostState = {
  camp: null,
  camps: [],
  campsPagination: initialState,
  error: null,
}

// actions と reducers の定義
const campModule = createSlice({
  name: 'camp',
  initialState: init,
  reducers: {
    setCampsLoading: (state, action: PayloadAction<boolean>) => {
      state.campsPagination.loading = action.payload
    },
    campsLoaded: (state, action: PayloadAction<CampLoaded>) => {
      const { next, hasMore } = action.payload
      state.campsPagination.loading = false
      state.campsPagination.hasMore = hasMore
      state.campsPagination.lastLoaded = next
    },
    setCamps: (state, action: PayloadAction<Camp[]>) => {
      state.camps = action.payload
    },
    addCamps: (state, action: PayloadAction<Camp[]>) => {
      state.camps = state.camps.concat(action.payload)
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.camps = []
    },
  },
})

export const useCamps = () =>
  useSelector(
    (state: { lost: ReturnType<typeof campModule.reducer> }) =>
      state.lost.camps,
  )
export const useCampsPagination = () =>
  useSelector(
    (state: { lost: ReturnType<typeof campModule.reducer> }) =>
      state.lost.campsPagination,
  )
export default campModule

// actions
const {
  setCampsLoading,
  campsLoaded,
  setCamps,
  addCamps,
  setError,
} = campModule.actions
interface CampLoaded {
  camps: Camp[]
  next: string
  hasMore: boolean
}
// thunk
const fetchCampsCommon = async (next, limit, dispatch, action, searchName) => {
  dispatch(setCampsLoading(true))
  try {
    const ret: CampLoaded = await readCamps(next, limit, searchName)
    dispatch(campsLoaded(ret))
    dispatch(action(ret.camps))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setCampsLoading(false))
  }
}
export const fetchCamps = (limit: number, searchName = ''): AppThunk => async (
  dispatch,
) => {
  await fetchCampsCommon(null, limit, dispatch, setCamps, searchName)
}

export const fetchCampsMore = (
  next: string,
  limit: number,
  searchName: string,
): AppThunk => async (dispatch) => {
  await fetchCampsCommon(next, limit, dispatch, addCamps, searchName)
}
