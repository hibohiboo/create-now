import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { Language, defaultLanguage } from '~/lib/i18n'
import type { PaginationState } from './pagination'
import type { Camp } from './camp'
import type {
  Character,
  CampsCharacters,
  CharacterClass,
  Ability,
  Bag,
  Item,
} from './character'
import type { Record } from './record'
import {
  initCamp,
  useCamps,
  useCampViewModel,
  fetchCamps,
  fetchCampsMore,
} from './camp'
import {
  initCharacter,
  initBag,
  isBodyParts,
  useCharacter,
  useCharacters,
  useCampsCharacters,
  useCharacterEditViewModel,
  fetchCharacters,
  fetchCharactersMore,
  fetchCampsCharacters,
} from './character'
import { initialState, useListPagination } from './pagination'
import { useRecordViewModel } from './record'
export type { Camp, Character, CharacterClass, Ability, Item, Bag }
export { initCamp, initCharacter, initBag }

type LostState = {
  camp: Camp | null
  camps: Camp[]
  listPagination: PaginationState
  error: string | null
  character: Character
  characters: { name: string; id: string }[]
  locale: Language
  campsCharacters: CampsCharacters[]
  record: Record | null
  records: Record[]
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
  record: null,
  records: [],
}

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

      // サプリメント追加要素なので存在しない可能性のある項目
      if (!state.character.backbones) state.character.backbones = []
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
export type LostModule = ReturnType<typeof lostModule.reducer>

// state
export {
  useCamps,
  useListPagination,
  useCharacter,
  useCharacters,
  useCampsCharacters,
}

// actions
export const {
  setPagenationLoading,
  paginationLoaded,
  setCamps,
  addCamps,
  setError,
  setCharacters,
  addCharacters,
  setCampsCharacters,
  setCharacter,
  toggleCharacterDamage,
  setCharacterBag,
  setLocale,
} = lostModule.actions

// ViewModel
export { useCampViewModel, useCharacterEditViewModel, useRecordViewModel }

// thunk
export {
  fetchCamps,
  fetchCampsMore,
  fetchCharacters,
  fetchCharactersMore,
  fetchCampsCharacters,
}
