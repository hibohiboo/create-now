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
import type { Record, Member } from './record'
import type { Boss } from './boss'
import type { Scenario } from './scenario'
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
  fetchCharactersRecords,
} from './character'
import { initialState, useListPagination } from './pagination'
import { useRecord, useRecordViewModel, initRecord } from './record'
import {
  initBoss,
  useBossEditViewModel,
  useBossesViewModel,
  useBossViewModel,
} from './boss'
import { initScenario, useScenarioEditViewModel } from './scenario'
export type {
  Camp,
  Character,
  CharacterClass,
  Ability,
  Item,
  Bag,
  Record,
  Boss,
}
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
  record: Record
  records: Record[]
  boss: Boss
  bosses: { id: string; name: string }[]
  scenario: Scenario
  scenarios: Scenario[]
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
  record: initRecord,
  records: [],
  boss: initBoss,
  bosses: [],
  scenario: initScenario,
  scenarios: [],
}

const damageParts = (
  name: string,
  damagedSpecialties: string[],
  locale: string,
  deleteCallback: (name: string) => void,
  damageCallback: (name: string) => void,
  partsDamageCallBack: (target: string) => void,
) => {
  const { specialties, bodyParts } =
    locale === defaultLanguage ? lostData : lostDataEn
  if (damagedSpecialties.includes(name)) {
    deleteCallback(name)
    return
  }
  if (!isBodyParts(bodyParts, name)) {
    damageCallback(name)
    return
  }
  // 部位を負傷した場合、8近傍にチェック
  const index = specialties.indexOf(name)
  ;[-12, -11, -10, -1, 0, 1, 10, 11, 12].forEach((i) => {
    const target = specialties[index + i]
    if (!target || damagedSpecialties.includes(target)) return
    partsDamageCallBack(target)
  })
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
      damageParts(
        name,
        damagedSpecialties,
        state.locale,
        (name) =>
          (state.character.damagedSpecialties = damagedSpecialties.filter(
            (item) => item !== name,
          )),
        (name) =>
          (state.character.damagedSpecialties = [
            ...state.character.damagedSpecialties,
            name,
          ]),
        (target) => state.character.damagedSpecialties.push(target),
      )
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
    setRecord: (state, action: PayloadAction<Record>) => {
      state.record = action.payload
    },
    setPartyMember: (state, action: PayloadAction<Member>) => {
      const { members } = state.record

      const index = members.findIndex((bag) => bag.id === action.payload.id)
      if (index === -1) {
        state.record.members = [...members, action.payload]
        return
      }
      state.record.members[index] = action.payload
    },
    setCharactersRecords: (state, action: PayloadAction<Record[]>) => {
      state.records = action.payload
    },
    setBosses: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.bosses = action.payload
    },
    addBosses: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.bosses = state.bosses.concat(action.payload)
    },
    setBoss: (state, action: PayloadAction<Boss>) => {
      state.boss = action.payload
    },
    toggleBossDamage: (state, action: PayloadAction<string>) => {
      const name = action.payload
      const { damagedSpecialties } = state.boss
      damageParts(
        name,
        damagedSpecialties,
        state.locale,
        (name) =>
          (state.boss.damagedSpecialties = damagedSpecialties.filter(
            (item) => item !== name,
          )),
        (name) =>
          (state.boss.damagedSpecialties = [
            ...state.boss.damagedSpecialties,
            name,
          ]),
        (target) => state.boss.damagedSpecialties.push(target),
      )
    },
    setScenarios: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.scenarios = action.payload
    },
    addScenarios: (
      state,
      action: PayloadAction<{ id: string; name: string }[]>,
    ) => {
      state.scenarios = state.scenarios.concat(action.payload)
    },
    setScenario: (state, action: PayloadAction<Scenario>) => {
      state.scenario = action.payload
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
  useRecord,
  useBossesViewModel,
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
  setRecord,
  setPartyMember,
  setCharactersRecords,
  setBoss,
  addBosses,
  setBosses,
  toggleBossDamage,
  setScenario,
  setScenarios,
  addScenarios,
} = lostModule.actions

// ViewModel
export {
  useCampViewModel,
  useCharacterEditViewModel,
  useRecordViewModel,
  useBossEditViewModel,
  useBossViewModel,
  useScenarioEditViewModel,
}

// thunk
export {
  fetchCamps,
  fetchCampsMore,
  fetchCharacters,
  fetchCharactersMore,
  fetchCampsCharacters,
  fetchCharactersRecords,
}
