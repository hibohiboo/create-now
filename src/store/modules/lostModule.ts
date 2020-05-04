import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'
import * as lostData from '~/data/lostrpg'
import useI18n from '~/hooks/use-i18n'
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

export interface Ability {
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
export interface CharacterClass {
  id: string
  name: string
}

export interface Item {
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
  specialties: string[]
  abilities: Ability[]
  gaps: ('A' | 'B' | 'C' | 'D' | 'E')[]
  items: Item[]
  staminaBase: number
  willPowerBase: number
  statusAilments: string[]
  carryingCapacity: number
  stamina: number
  willPower: number
  damagedSpecialties: string[]
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
  specialties: ['追跡', '口'],
  abilities: [],
  gaps: ['A', 'B'],
  items: [],
  staminaBase: 5,
  willPowerBase: 10,
  statusAilments: [],
  carryingCapacity: 10,
  stamina: 10,
  willPower: 10,
  damagedSpecialties: ['殴る'],
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

const specialtiesTableColumns = (character: Character) => {
  const makeData = (name) => {
    const selected = character.gaps.includes(name)
    return { name, selected }
  }
  return lostData.specialtiesTableColumns.map(makeData)
}

const specialtiesTableRows = (character: Character) => {
  const makeData = (name, gap?) => {
    const isBodyParts = lostData.bodyParts.includes(name)
    const selected =
      (gap && character.gaps.includes(gap)) ||
      character.specialties.includes(name)
    const damaged = character.damagedSpecialties.includes(name)
    return { name, isBodyParts, selected, damaged }
  }

  return _.range(11).map((y) => ({
    number: y + 2,
    talent: makeData(lostData.specialties[y]),
    a: makeData('', 'A'),
    head: makeData(lostData.specialties[11 + y]),
    b: makeData('', 'B'),
    arms: makeData(lostData.specialties[22 + y]),
    c: makeData('', 'C'),
    torso: makeData(lostData.specialties[33 + y]),
    d: makeData('', 'D'),
    legs: makeData(lostData.specialties[44 + y]),
    e: makeData('', 'E'),
    survival: makeData(lostData.specialties[55 + y]),
  }))
}

export const useCharacterEditViewModel = () =>
  useSelector((state: { lost: ReturnType<typeof lostModule.reducer> }) => {
    const i18n = useI18n()
    const { character } = state.lost
    return {
      classList: lostData.classList.filter(
        (item) => !character.classes.includes(item),
      ),
      abilitiesColumns:
        i18n.activeLocale === 'ja'
          ? lostData.abilitiesColumns
          : lostData.abilitiesColumnsEn,
      abilityList: lostData.abilityList
        .filter(
          (item) =>
            item.id === 'general' ||
            character.classes.findIndex((c) => c.id === item.id) !== -1,
        )
        .map((item) => item.list)
        .flat()
        .filter((item) => !character.abilities.includes(item)),
      specialtiesTableColumns: specialtiesTableColumns(character),
      // 'talent' | 'head' | 'arms' | 'torso' | 'legs' | 'survival'
      specialtiesTableRows: specialtiesTableRows(character),
    }
  })
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
