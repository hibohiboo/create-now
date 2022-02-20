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
  Backbone,
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
import {
  initScenario,
  useScenarioEditViewModel,
  mdToScenario,
  useScenariosViewModel,
} from './scenario'

export type {
  Camp,
  Character,
  CharacterClass,
  Ability,
  Item,
  Bag,
  Record,
  Boss,
  Scenario,
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
  scenarios: { id: string; name: string }[]
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
  // 8近傍
  const neighborhoods = [-12, -11, -10, -1, 0, 1, 10, 11, 12]

  // 8近傍以内に負傷部位があるか
  const isDamanged = (i: number, damagedParts: number[]) =>
    neighborhoods.some((n) => damagedParts.includes(n + i))

  // 特技回復
  if (damagedSpecialties.includes(name) && !isBodyParts(bodyParts, name)) {
    deleteCallback(name)
    return
  }

  // 部位回復
  if (damagedSpecialties.includes(name) && isBodyParts(bodyParts, name)) {
    const index = specialties.indexOf(name)
    const otherParts = damagedSpecialties
      .filter((n) => n !== name && isBodyParts(bodyParts, n))
      .map((n) => specialties.indexOf(n))

    // 8近傍削除
    neighborhoods.forEach((i) => {
      const target = specialties[index + i]
      if (isDamanged(index + i, otherParts)) return
      deleteCallback(target)
    })
    console.log(damagedSpecialties)
    return
  }
  // 特技損傷
  if (!isBodyParts(bodyParts, name)) {
    damageCallback(name)
    return
  }
  // 部位を負傷した場合、8近傍にチェック
  const index = specialties.indexOf(name)
  neighborhoods.forEach((i) => {
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
    // start character
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
          (state.character.damagedSpecialties = state.character.damagedSpecialties.filter(
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
    setPlayerName: (state, action: PayloadAction<string>) => {
      state.character.playerName = action.payload
    },
    setUseDragonPlain: (state, action: PayloadAction<boolean>) => {
      state.character.useDragonPlain = action.payload
    },
    setUseStrangeField: (state, action: PayloadAction<boolean>) => {
      state.character.useStrangeField = action.payload
    },
    setCharacterCamp: (
      state,
      action: PayloadAction<{ id: string; name: string }>,
    ) => {
      state.character.campId = action.payload.id
      state.character.campName = action.payload.name
    },
    setCharacterName: (state, action: PayloadAction<string>) => {
      state.character.name = action.payload
    },
    setCharacterClass: (state, action: PayloadAction<CharacterClass>) => {
      state.character.classes.push(action.payload)
    },
    deleteCharacterClass: (state, action: PayloadAction<CharacterClass>) => {
      state.character.classes = state.character.classes.filter(
        (i) => i.name !== action.payload.name,
      )
    },
    toggleCharacterGap: (
      state,
      action: PayloadAction<'A' | 'B' | 'C' | 'D' | 'E'>,
    ) => {
      state.character.gaps = state.character.gaps.includes(action.payload)
        ? state.character.gaps.filter((item) => item !== action.payload)
        : [...state.character.gaps, action.payload]
    },
    toggleCharacterSpecial: (state, action: PayloadAction<string>) => {
      state.character.specialties = state.character.specialties.includes(
        action.payload,
      )
        ? state.character.specialties.filter((item) => item !== action.payload)
        : [...state.character.specialties, action.payload]
    },
    addAbility: (state, action: PayloadAction<Ability>) => {
      state.character.abilities.push(action.payload)
    },
    updateAbility: (
      state,
      action: PayloadAction<{ oldData: Ability; newData: Ability }>,
    ) => {
      const { oldData, newData } = action.payload
      state.character.abilities[
        state.character.abilities.findIndex((i) => i.name === oldData.name)
      ] = newData
    },
    deleteAbility: (state, action: PayloadAction<Ability>) => {
      state.character.abilities.splice(
        state.character.abilities.findIndex(
          (i) => i.name === action.payload.name,
        ),
        1,
      )
    },
    setStaminaBase: (state, action: PayloadAction<number>) => {
      state.character.staminaBase = action.payload
    },
    setStamina: (state, action: PayloadAction<number>) => {
      state.character.stamina = action.payload
    },
    setWillPowerBase: (state, action: PayloadAction<number>) => {
      state.character.willPowerBase = action.payload
    },
    setWillPower: (state, action: PayloadAction<number>) => {
      state.character.willPower = action.payload
    },
    setCarryingCapacity: (state, action: PayloadAction<number>) => {
      state.character.carryingCapacity = action.payload
    },
    addItem: (state, action: PayloadAction<Item>) => {
      state.character.items.push(action.payload)
    },
    updateItem: (
      state,
      action: PayloadAction<{ oldData: Item; newData: Item }>,
    ) => {
      const { oldData, newData } = action.payload
      state.character.items[
        state.character.items.findIndex((i) => i.id === oldData.id)
      ] = newData
    },
    deleteItem: (state, action: PayloadAction<Item>) => {
      state.character.items.splice(
        state.character.items.findIndex((i) => i.id === action.payload.id),
        1,
      )
    },
    addCharacterBag: (state, action: PayloadAction<Bag>) => {
      state.character.bags.push(action.payload)
    },
    removeCharacterBag: (state, action: PayloadAction<Bag>) => {
      state.character.bags = state.character.bags.filter(
        (b) => b.id !== action.payload.id,
      )
    },
    removeCharacterEquipment: (state, action: PayloadAction<string>) => {
      const equipments = state.character.equipments.filter(
        (i) => i.equipedArea !== action.payload,
      )
      state.character.equipments = equipments
    },
    addCharacterEquipment: (state, action: PayloadAction<Item>) => {
      const equipments = state.character.equipments.filter(
        (i) => i.equipedArea !== action.payload.equipedArea,
      )
      equipments.push(action.payload)
      state.character.equipments = equipments
    },
    removeStatusAilment: (state, action: PayloadAction<string>) => {
      state.character.statusAilments = state.character.statusAilments.filter(
        (name) => name !== action.payload,
      )
    },
    addStatusAilment: (state, action: PayloadAction<string>) => {
      state.character.statusAilments.push(action.payload)
    },
    addCharacterBackbone: (state, action: PayloadAction<Backbone>) => {
      state.character.backbones.push(action.payload)
    },
    updateCharacterBackbone: (
      state,
      action: PayloadAction<{ newData: Backbone; oldData: Backbone }>,
    ) => {
      const { oldData, newData } = action.payload
      state.character.backbones[
        state.character.backbones.findIndex((i) => i.name === oldData.name)
      ] = newData
    },
    deleteCharacterBackbone: (state, action: PayloadAction<Backbone>) => {
      state.character.backbones.splice(
        state.character.backbones.findIndex(
          (i) => i.name === action.payload.name,
        ),
        1,
      )
    },
    setUnUsedExperience: (state, action: PayloadAction<number>) => {
      state.character.unusedExperience = action.payload
    },
    setTotalExperience: (state, action: PayloadAction<number>) => {
      state.character.totalExperience = action.payload
    },
    setCharacterSummary: (state, action: PayloadAction<string>) => {
      state.character.summary = action.payload
    },
    setCharacterAppearance: (state, action: PayloadAction<string>) => {
      state.character.appearance = action.payload
    },
    setCharacterFreeWriting: (state, action: PayloadAction<string>) => {
      state.character.freeWriting = action.payload
    },
    setCharacterQuote: (state, action: PayloadAction<string>) => {
      state.character.quote = action.payload
    },
    // end character
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
    setMarkdownForScenario: (state, action: PayloadAction<string>) => {
      state.scenario = {
        ...state.scenario,
        ...mdToScenario(action.payload),
        isPublish: state.scenario.isPublish,
        creatorName: state.scenario.creatorName,
      }
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
  setMarkdownForScenario,
} = lostModule.actions

// ViewModel
export {
  useCampViewModel,
  useCharacterEditViewModel,
  useRecordViewModel,
  useBossEditViewModel,
  useBossViewModel,
  useScenarioEditViewModel,
  useScenariosViewModel,
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
