import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'
import { readCharacters, readCampsCharacters } from '~/firestore/character'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { Language, defaultLanguage } from '~/lib/i18n'

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
  summary?: string
  items: Item[]
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
  summary: '',
  items: [],
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
  number?: number
  id?: string // テーブルで編集するとき用のユニークなID
  equipedArea?: string // 装備用
}

export interface Bag {
  name: string
  capacity: number
  items: Item[]
  id: string // テーブルで編集するとき用のユニークなID
}

export interface Character {
  name: string
  classes: CharacterClass[]
  specialties: string[]
  abilities: Ability[]
  gaps: ('A' | 'B' | 'C' | 'D' | 'E')[]
  bags: Bag[]
  items: Item[]
  equipments: Item[]
  staminaBase: number
  willPowerBase: number
  statusAilments: string[]
  carryingCapacity: number
  stamina: number
  willPower: number
  damagedSpecialties: string[]
  freeWriting?: string
  quote?: string
  summary?: string
  appearance?: string
  unusedExperience: number
  totalExperience: number
  campName?: string
  campId?: string
  playerName?: string
  uid?: string
  imageUrl?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}
export const initBag = {
  id: 'bag',
  name: '新しい袋',
  capacity: 1,
  items: [],
}

export const initCharacter: Character = {
  name: '',
  classes: [],
  specialties: [],
  abilities: [],
  gaps: [],
  bags: [
    {
      id: 'first-bag-リュック',
      name: 'リュックサック',
      capacity: 10,
      items: [
        {
          id: 'first-jurkey',
          name: 'ジャーキー',
          number: 10,
          j: 1,
          weight: 1,
          type: '支援',
          area: '-',
          specialty: '-',
          target: '自身',
          trait: '食料',
          effect: '1日分の食料。【気力】が1点増加する。通貨単位J。',
        },
      ],
    },
  ],
  items: [
    {
      id: 'first-bag',
      name: 'リュックサック',
      number: 1,
      j: 5,
      weight: 2,
      type: '道具',
      area: '-',
      specialty: '-',
      target: '-',
      trait: '袋',
      effect:
        '総重量10まで袋の中にアイテムを入れることができる。袋の中のアイテムの重量は所持限界から無視する。',
    },
  ],
  equipments: [],
  staminaBase: 5,
  willPowerBase: 10,
  statusAilments: [],
  carryingCapacity: 5,
  stamina: 10,
  willPower: 10,
  unusedExperience: 0,
  totalExperience: 0,
  damagedSpecialties: [],
  quote: '',
  summary: '',
  appearance: '',
  freeWriting: '',
  playerName: '',
  campName: '',
  campId: '',
  createdAt: '',
  updatedAt: '',
  uid: '',
}
interface CampsCharacters {
  characterId: string
  characterName: string
  campId: string
  campName: string
}
type LostState = {
  camp: Camp | null
  camps: Camp[]
  listPagination: PaginationState
  error: string | null
  character: Character
  characters: { name: string; id: string }[]
  locale: Language
  campsCharacters: CampsCharacters[]
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
  listPagination: initialState,
  error: null,
  character: initCharacter,
  characters: [],
  locale: defaultLanguage,
  campsCharacters: [],
}

const isBodyParts = (bodyParts, name) => bodyParts.includes(name)

// actions と reducers の定義
const lostModule = createSlice({
  name: 'lost',
  initialState: init,
  reducers: {
    setPagenationLoading: (state, action: PayloadAction<boolean>) => {
      state.listPagination.loading = action.payload
    },
    paginationLoaded: (
      state,
      action: PayloadAction<{ next: string; hasMore: boolean }>,
    ) => {
      const { next, hasMore } = action.payload
      state.listPagination.loading = false
      state.listPagination.hasMore = hasMore
      state.listPagination.lastLoaded = next
    },
    setCamps: (state, action: PayloadAction<Camp[]>) => {
      state.camps = action.payload
    },
    addCamps: (state, action: PayloadAction<Camp[]>) => {
      state.camps = state.camps.concat(action.payload)
    },
    setCharacters: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.characters = action.payload
    },
    addCharacters: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.characters = state.characters.concat(action.payload)
    },
    setCharacter: (state, action: PayloadAction<Character>) => {
      state.character = action.payload
    },
    toggleCharacterDamage: (state, action: PayloadAction<string>) => {
      const name = action.payload
      const { damagedSpecialties } = state.character
      const { specialties, bodyParts } =
        state.locale === defaultLanguage ? lostData : lostDataEn
      if (damagedSpecialties.includes(name)) {
        state.character.damagedSpecialties = damagedSpecialties.filter(
          (item) => item !== name,
        )
        return
      }
      if (!isBodyParts(bodyParts, name)) {
        state.character.damagedSpecialties = [
          ...state.character.damagedSpecialties,
          name,
        ]
        return
      }
      // 部位を負傷した場合、8近傍にチェック
      const index = specialties.indexOf(name)
      ;[-12, -11, -10, -1, 0, 1, 10, 11, 12].forEach((i) => {
        const target = specialties[index + i]
        if (!target || damagedSpecialties.includes(target)) return
        state.character.damagedSpecialties.push(target)
      })
    },
    setCharacterBag: (state, action: PayloadAction<Bag>) => {
      const { bags } = state.character

      const index = bags.findIndex((bag) => bag.id === action.payload.id)
      if (index === -1) {
        state.character.bags = [...bags, action.payload]
        return
      }
      state.character.bags[index] = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
      state.camps = []
    },
    setLocale: (state, action: PayloadAction<Language>) => {
      state.locale = action.payload
    },
    setCampsCharacters: (state, action: PayloadAction<CampsCharacters[]>) => {
      state.campsCharacters = action.payload
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
export const useListPagination = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.listPagination,
  )
export const useCharacter = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.character,
  )
export const useCharacters = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.characters,
  )
export const useCampsCharacters = () =>
  useSelector(
    (state: { lost: ReturnType<typeof lostModule.reducer> }) =>
      state.lost.campsCharacters,
  )
const makeSpecialtiesTableColumns = (
  specialtiesTableColumns: any[],
  character: Character,
) => {
  const makeData = (name) => {
    const selected = character.gaps.includes(name)
    return { name, selected }
  }
  return specialtiesTableColumns.map(makeData)
}

const specialtiesTableRows = (
  bodyParts: string[],
  specialties: any[],
  character: Character,
) => {
  const makeData = (name, gap?) => {
    const selected =
      (gap && character.gaps.includes(gap)) ||
      character.specialties.includes(name)
    const damaged = character.damagedSpecialties.includes(name)
    return {
      name,
      selected,
      damaged,
      isBodyParts: isBodyParts(bodyParts, name),
    }
  }

  return _.range(11).map((y) => ({
    number: y + 2,
    talent: makeData(specialties[y]),
    a: makeData('', 'A'),
    head: makeData(specialties[11 + y]),
    b: makeData('', 'B'),
    arms: makeData(specialties[22 + y]),
    c: makeData('', 'C'),
    torso: makeData(specialties[33 + y]),
    d: makeData('', 'D'),
    legs: makeData(specialties[44 + y]),
    e: makeData('', 'E'),
    survival: makeData(specialties[55 + y]),
  }))
}

const damageBodyParts = (bodyParts: string[], character: Character) => {
  const makeData = (name) => {
    const damaged = character.damagedSpecialties.includes(name)
    return { name, damaged }
  }
  return bodyParts.map(makeData)
}

const equipments = (character: Character, i18n) => {
  const areas = [
    i18n.t('lostrpg_character_common_rightHand'),
    i18n.t('lostrpg_character_common_leftHand'),
    i18n.t('lostrpg_character_common_head'),
    i18n.t('lostrpg_character_common_arms'),
    i18n.t('lostrpg_character_common_torso'),
    i18n.t('lostrpg_character_common_legs'),
  ]
  const makeData = (name) => {
    const item = character.equipments.find((i) => i.equipedArea === name)
    if (!item) {
      return {
        equipedArea: name,
        name: '',
        type: '',
        specialty: '',
        target: '',
        trait: '',
        effect: '',
      }
    }
    return {
      equipedArea: name,
      name: item.name,
      type: item.type,
      specialty: item.specialty,
      target: item.target,
      trait: item.trait,
      effect: item.effect,
    }
  }
  return areas.map(makeData)
}

const makeStatusAilments = (
  character: Character,
  ailments: { name: string; effect: string }[],
) =>
  ailments.map(({ name, effect }) => ({
    name,
    effect,
    isChecked: character.statusAilments.includes(name),
  }))

export const useCharacterEditViewModel = () =>
  useSelector((state: { lost: ReturnType<typeof lostModule.reducer> }) => {
    const i18n = useI18n()
    const { character } = state.lost
    const {
      abilitiesColumns,
      itemsColumns,
      items,
      equipmentColumns,
      statusAilments,
      classList,
      abilityList,
      specialties,
      bodyParts,
      specialtiesTableColumns,
    } = i18n.activeLocale === defaultLanguage ? lostData : lostDataEn

    return {
      classList: classList.filter((item) => !character.classes.includes(item)),
      abilitiesColumns,
      abilityList: abilityList
        .filter(
          (item) =>
            item.id === 'general' ||
            character.classes.findIndex((c) => c.id === item.id) !== -1,
        )
        .map((item) => item.list)
        .flat()
        .filter((item) => !character.abilities.includes(item)),
      specialtiesTableColumns: makeSpecialtiesTableColumns(
        specialtiesTableColumns,
        character,
      ),
      specialtiesTableRows: specialtiesTableRows(
        bodyParts,
        specialties,
        character,
      ),
      damageBodyParts: damageBodyParts(bodyParts, character),
      itemsColumns,
      items,
      equipmentColumns,
      equipments: equipments(character, i18n),
      statusAilments: makeStatusAilments(character, statusAilments),
    }
  })
export const useCampViewModel = () =>
  useSelector((state: { lost: ReturnType<typeof lostModule.reducer> }) => {
    const i18n = useI18n()
    const { itemsColumns, items } =
      i18n.activeLocale === defaultLanguage ? lostData : lostDataEn

    return {
      itemsColumns,
      items,
    }
  })

// actions
const {
  setPagenationLoading,
  paginationLoaded,
  setCamps,
  addCamps,
  setError,
  setCharacters,
  addCharacters,
  setCampsCharacters,
} = lostModule.actions

export const {
  setCharacter,
  toggleCharacterDamage,
  setCharacterBag,
  setLocale,
} = lostModule.actions

interface CampLoaded {
  camps: Camp[]
  next: string
  hasMore: boolean
}

interface CharactersLoaded {
  characters: { name: string; id: string }[]
  next: string
  hasMore: boolean
}

// thunk
const fetchCampsCommon = async (next, limit, dispatch, action, searchName) => {
  dispatch(setPagenationLoading(true))
  try {
    const ret: CampLoaded = await readCamps(next, limit, searchName)
    dispatch(paginationLoaded(ret))
    dispatch(action(ret.camps))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setPagenationLoading(false))
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

const fetchCharactersCommon = async (
  next,
  limit,
  dispatch,
  action,
  searchName,
) => {
  dispatch(setPagenationLoading(true))
  try {
    const ret: CharactersLoaded = await readCharacters(next, limit, searchName)
    dispatch(paginationLoaded(ret))
    dispatch(action(ret.characters))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setPagenationLoading(false))
  }
}
export const fetchCharacters = (
  limit: number,
  searchName = '',
): AppThunk => async (dispatch) => {
  await fetchCharactersCommon(null, limit, dispatch, setCharacters, searchName)
}

export const fetchCharactersMore = (
  next: string,
  limit: number,
  searchName: string,
): AppThunk => async (dispatch) => {
  await fetchCharactersCommon(next, limit, dispatch, addCharacters, searchName)
}

export const fetchCampsCharacters = (id: string): AppThunk => async (
  dispatch,
) => {
  const ret = await readCampsCharacters(id)
  dispatch(setCampsCharacters(ret))
}
