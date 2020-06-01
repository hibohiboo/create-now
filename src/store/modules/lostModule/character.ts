import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { readCharacters, readCampsCharacters } from '~/firestore/character'
import { readCharactersRecords } from '~/firestore/record'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { defaultLanguage } from '~/lib/i18n'
import { FileArchiver, converDocToXML } from '~/lib/fileArchiver'
import type { LostModule } from './index'
import {
  setPagenationLoading,
  paginationLoaded,
  setError,
  setCharacters,
  addCharacters,
  setCampsCharacters,
  setCharactersRecords,
} from './index'

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

interface Backbone {
  name: string
  type: string
  effect: string
  id: string // テーブルで編集するとき用のユニークなID
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
  useStrangeField?: boolean
  backbones: Backbone[]
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
  useStrangeField: false,
  backbones: [],
}
export interface CampsCharacters {
  characterId: string
  characterName: string
  campId: string
  campName: string
}

// state
export const useCharacter = () =>
  useSelector((state: { lost: LostModule }) => state.lost.character)
export const useCharacters = () =>
  useSelector((state: { lost: LostModule }) => state.lost.characters)
export const useCampsCharacters = () =>
  useSelector((state: { lost: LostModule }) => state.lost.campsCharacters)

// ViewModel
export const isBodyParts = (bodyParts, name) => bodyParts.includes(name)

export const makeSpecialtiesTableColumns = (
  specialtiesTableColumns: any[],
  character: { gaps: string[] },
) => {
  const makeData = (name) => {
    const selected = character.gaps.includes(name)
    return { name, selected }
  }
  return specialtiesTableColumns.map(makeData)
}

export const specialtiesTableRows = (
  bodyParts: string[],
  specialties: any[],
  character: {
    damagedSpecialties: string[]
    gaps: string[]
    specialties: string[]
  },
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
const $e = (
  doc: Document,
  elm: string,
  attributes: [string, string][] = [],
) => {
  const e = doc.createElement(elm)
  setAttributes(e, attributes)
  return e
}
const setAttributes = (e: Element, attributes: [string, string][]) => {
  attributes.forEach(([attr, val]) => {
    e.setAttribute(attr, val)
  })
}
const characterToDoc = (character: Character) => {
  const doc = document.implementation.createDocument('', '', null)
  const characterElm = $e(doc, 'character', [['location.name', 'table']])
  doc.appendChild(characterElm)
  return doc
}

export const damageBodyParts = (
  bodyParts: string[],
  character: { damagedSpecialties: string[] },
) => {
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
        j: 0,
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
      j: item.j,
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
  useSelector((state: { lost: LostModule }) => {
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
      strangeFieldsClassList,
      strangeFieldsAbilityList,
      strangeFieldsItemList,
      backboneList,
      backboneColumns,
      recordsColumns,
      trophyAbilityList,
    } = i18n.activeLocale === defaultLanguage ? lostData : lostDataEn
    let mergedClassList = classList
    let mergedAbilities = abilityList
    let mergedItemList = items
    if (character.useStrangeField) {
      mergedItemList = _.union(mergedItemList, strangeFieldsItemList)
      mergedClassList = _.union(mergedClassList, strangeFieldsClassList)
      mergedAbilities = _.union(
        mergedAbilities,
        strangeFieldsAbilityList,
        trophyAbilityList,
      )
    }
    const trophies = _.uniq(state.lost.records.map((i) => i.trophy))
    return {
      classList: mergedClassList.filter(
        (item) => !character.classes.includes(item),
      ),
      abilitiesColumns,
      abilityList: mergedAbilities
        .filter(
          (item) =>
            item.id === 'general' ||
            character.classes.findIndex((c) => c.id === item.id) !== -1 ||
            trophies.includes(item.name),
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
      items: mergedItemList,
      equipmentColumns,
      equipments: equipments(character, i18n),
      statusAilments: makeStatusAilments(character, statusAilments),
      totalWeight: character.items.reduce(
        (sum, { weight, number }) => sum + weight * number,
        0,
      ),
      totalValue:
        character.items.reduce((sum, { j, number }) => sum + j * number, 0) +
        character.bags
          .map((bag) => bag.items)
          .flat()
          .reduce((sum, { j, number }) => sum + j * number, 0) +
        character.equipments.reduce((sum, { j }) => sum + j, 0),
      backboneList,
      backboneColumns,
      records: state.lost.records,
      recordsColumns,
      totalRecordExp: state.lost.records
        .map((i) => i.exp)
        .reduce((sum, i) => sum + i, 0),
      exportXml: () => {
        const doc = characterToDoc(character)
        const sXML = converDocToXML(doc)
        const files: File[] = []
        files.push(new File([sXML], 'data.xml', { type: 'text/plain' }))
        FileArchiver.instance.save(files, character.name)
      },
    }
  })

// thunks
interface CharactersLoaded {
  characters: { name: string; id: string }[]
  next: string
  hasMore: boolean
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
export const fetchCharactersRecords = (id: string): AppThunk => async (
  dispatch,
) => {
  const ret = await readCharactersRecords(id)
  dispatch(setCharactersRecords(ret))
}
