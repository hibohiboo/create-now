import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'

export interface Facility {
  name: string
  type: string
  specialty: string
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
  imageUrl?: string
  twitterId?: string
  createdAt?: any
  updatedAt?: any
}

interface Ability {
  name: string
  group: string
  type: string
  recoil: string
  specialty: string
  target: string
  effect: string
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
interface CharacterClass {
  id: string
  name: string
}
interface Specialty {
  name: string
  area: 'Talent' | 'Head' | 'Arms' | 'Torso' | 'Legs' | 'Survival'
  type: 'BodyParts' | 'Action'
  point: { x: number; y: number }
  checked: boolean
}

interface Item {
  name: string
  j: number
  weight: number
  type: string
  area: string
  specialty: string
  target: string
  trait: string
  effect: string
}
export interface Character {
  name: string
  classes: CharacterClass[]
  specialties: Specialty[]
  abilities: Ability[]
  gap: number[]
  items: Item[]
  staminaBase: number
  stamina: number
  willPowerBase: number
  willPower: number
  statusAilments: string[]
  carryingCapacity: number
  freeWriting?: string
  playerName?: string
  uid?: string
  imageUrl?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}
export const initCharacter: Character = {
  name: '',
  classes: [],
  specialties: [],
  abilities: [],
  gap: [],
  items: [],
  staminaBase: 5,
  stamina: 10,
  willPowerBase: 10,
  willPower: 10,
  statusAilments: [],
  carryingCapacity: 10,
  freeWriting: '',
  playerName: '',
  createdAt: '',
  updatedAt: '',
  uid: '',
}

type LostState = {
  camp: Camp | null
  camps: Camp[]
  campsPagination: PaginationState
  error: string | null
  character: Character
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
  character: initCharacter,
}

// actions と reducers の定義
const lostModule = createSlice({
  name: 'lost',
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
    setCharacter: (state, action: PayloadAction<Character>) => {
      console.log('aaa', action)
      state.character = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.camps = []
    },
  },
})

export default lostModule

// state
export const useCamps = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.camps,
  )
export const useCampsPagination = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.campsPagination,
  )
export const useCharacter = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.character,
  )

// actions
const {
  setCampsLoading,
  campsLoaded,
  setCamps,
  addCamps,
  setError,
} = lostModule.actions

export const { setCharacter } = lostModule.actions

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
