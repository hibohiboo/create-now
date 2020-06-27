import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { readCharacters, readCampsCharacters } from '~/firestore/character'
import { readCharactersRecords } from '~/firestore/record'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { defaultLanguage } from '~/lib/i18n'
import { MimeType } from '~/lib/udonarium/mimeType'
import { calcSHA256Async } from '~/lib/udonarium/FileReaderUtil'
import {
  FileArchiver,
  convertDocToXML,
  createDoc,
  createElement,
} from '~/lib/fileArchiver'
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
import { getIdFromQuery } from '~/utils/urlHelper'
import {
  setCharacter,
  toggleCharacterDamage,
  setCharacterBag,
  setLocale,
  fetchCamps,
  useCamps,
} from '~/store/modules/lostModule'
import { useAuth } from '~/store/modules/authModule'
import { createSetImageFile } from '~/utils/formHelper'
import {
  createCharacter,
  getCharacter,
  updateCharacter,
  deleteCharacter,
  canEdit,
} from '~/firestore/character'

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
  useDragonPlain?: boolean
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
  useDragonPlain: false,
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

const characterToDoc = (
  character: Character,
  parts: {
    name: string
    damaged: boolean
  }[],
  status: {
    name: string
    effect: string
    isChecked: boolean
  }[],
  i18n: any,
  identifier: string,
) => {
  const t = i18n.t
  const doc = createDoc()
  const characterElm = createElement(doc, 'character', [
    ['location.name', 'table'],
    ['location.x', '0'],
    ['location.y', '0'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
  ])
  // #char
  const char = createElement(doc, 'data', [['name', 'character']])

  // char image
  if (identifier) {
    const image = createElement(doc, 'data', [['name', 'image']])
    const imageIdentifier = createElement(
      doc,
      'data',
      [
        ['name', 'imageIdentifier'],
        ['type', 'image'],
      ],
      identifier,
    )
    image.appendChild(imageIdentifier)
    char.appendChild(image)
  }

  // char common
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], character.name)
  const size = createElement(doc, 'data', [['name', 'size']], '1')
  common.appendChild(name)
  common.appendChild(size)
  char.appendChild(common)

  // char detail
  const detail = createElement(doc, 'data', [['name', 'detail']])

  // char detail resource
  const resource = createElement(doc, 'data', [['name', t('common_resource')]])
  const stamina = createElement(
    doc,
    'data',
    [
      ['name', t('lostrpg_character_common_stamina')],
      ['type', 'numberResource'],
      ['currentValue', character.stamina],
    ],
    String(character.stamina * 2),
  )
  const willPower = createElement(
    doc,
    'data',
    [
      ['name', t('lostrpg_character_common_willPower')],
      ['type', 'numberResource'],
      ['currentValue', character.willPower],
    ],
    String(character.willPower * 2),
  )
  resource.appendChild(stamina)
  resource.appendChild(willPower)
  detail.appendChild(resource)
  // char detail info
  const info = createElement(doc, 'data', [['name', t('common_info')]])
  info.appendChild(
    createElement(doc, 'data', [['name', 'PL']], character.playerName),
  )

  info.appendChild(
    createElement(
      doc,
      'data',
      [
        ['name', t('common_summary')],
        ['type', 'note'],
      ],
      character.summary,
    ),
  )
  info.appendChild(
    createElement(
      doc,
      'data',
      [
        ['name', 'URL'],
        ['type', 'note'],
      ],
      `https://create-now.now.sh/lostrpg/public/${i18n.activeLocale}/character?id=${character.id}`,
    ),
  )
  detail.appendChild(info)
  // char detail 部位
  const area = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_area')],
  ])
  parts.forEach((p) => {
    area.appendChild(
      createElement(
        doc,
        'data',
        [
          ['name', p.name],
          ['type', 'numberResource'],
          ['currentValue', p.damaged ? '0' : '1'],
        ],
        '1',
      ),
    )
  })
  detail.appendChild(area)
  // char detail 変調
  const statusAilments = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_statusAilments')],
  ])
  status.forEach((s) => {
    statusAilments.appendChild(
      createElement(
        doc,
        'data',
        [
          ['name', s.name],
          ['type', 'numberResource'],
          ['currentValue', s.isChecked ? '1' : '0'],
        ],
        '1',
      ),
    )
  })
  detail.appendChild(statusAilments)
  // char detail 特技
  const specialty = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_specialty')],
  ])
  character.specialties.forEach((s, i) => {
    specialty.appendChild(
      createElement(
        doc,
        'data',
        [['name', `${t('lostrpg_character_common_specialty')}${i + 1}`]],
        s,
      ),
    )
  })
  detail.appendChild(specialty)
  // char detail アビリティ
  const abilities = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_abilities_column')],
  ])
  character.abilities.forEach((a) => {
    abilities.appendChild(
      createElement(
        doc,
        'data',
        [
          ['name', a.name],
          ['type', 'note'],
        ],
        `${a.group}/${a.type}/${a.specialty}/${a.target}/${a.recoil}/${a.effect}`,
      ),
    )
  })
  detail.appendChild(abilities)

  // char detail アイテム
  const items = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_item')],
  ])
  // character.items.forEach((a) => {
  //   items.appendChild(
  //     createElement(
  //       doc,
  //       'data',
  //       [
  //         ['name', a.name],
  //         ['type', 'note'],
  //       ],
  //       `${a.j}/${a.weight}/${a.type}/${a.area || '-'}/${a.specialty}/${
  //         a.target
  //       }/${a.trait}/${a.effect}`,
  //     ),
  //   )
  // })
  character.items.forEach((a) => {
    items.appendChild(
      createElement(
        doc,
        'data',
        [
          ['name', a.name],
          ['type', 'numberResource'],
          ['currentValue', `${a.number}`],
        ],
        `${a.number}`,
      ),
    )
  })
  detail.appendChild(items)
  character.bags.forEach((b) => {
    const bag = createElement(doc, 'data', [['name', b.name]])
    b.items.forEach((a) => {
      bag.appendChild(
        createElement(
          doc,
          'data',
          [
            ['name', a.name],
            ['type', 'numberResource'],
            ['currentValue', `${a.number}`],
          ],
          `${a.number}`,
        ),
      )
    })
    detail.appendChild(bag)
  })
  // char detail 装備
  const equipments = createElement(doc, 'data', [
    ['name', t('lostrpg_character_common_equipments_column')],
  ])
  character.equipments.forEach((e) => {
    equipments.appendChild(
      createElement(
        doc,
        'data',
        [
          ['name', e.name],
          ['type', 'note'],
        ],
        `${e.equipedArea}/${e.type}/${e.specialty}/${e.target}/${e.trait}/${e.effect}`,
      ),
    )
  })
  detail.appendChild(equipments)
  // char detail
  char.appendChild(detail)

  // add char
  characterElm.appendChild(char)

  // add palette
  const palette = createElement(
    doc,
    'chat-palette',
    [],
    `//------${t('lostrpg_character_common_ability')}\n` +
      character.abilities.map((a) => `[${a.name}] {${a.name}}`).join('\n'),
  )
  characterElm.appendChild(palette)
  // add character to doc
  doc.appendChild(characterElm)
  return doc
}

const characterToTRPGStudioDoc = (
  character: Character,
  parts: {
    name: string
    damaged: boolean
  }[],
  status: {
    name: string
    effect: string
    isChecked: boolean
  }[],
  i18n: any,
  specialtiesTableColumns: string[],
  specialties: string[],
  abilitiesColumns: string[],
  equipmentColumns: string[],
  itemsColumns: string[],
) => {
  const heads = specialtiesTableColumns.filter((c, i) => i % 2 === 1)
  const makeData = (t) => ({
    t,
    c: character.specialties.includes(t),
    k: 1,
  })
  const specialityList = _.range(11).map((y) =>
    _.range(6).map((x) => makeData(specialties[y + 11 * x])),
  )
  const result = {
    info: {
      chara_name: character.name,
      age: '',
      sex: '',
      job: `${character.classes.map((c) => c.name).join('/')}`,
      commands: '',
      remarks: character.summary,
    },
    array_forms: [
      {
        type: 'charaSheetInputCloneNumber',
        title: i18n.t('common_status'),
        forms: [
          {
            text: i18n.t('lostrpg_character_common_staminaBase'),
            panel: false,
            number: character.staminaBase,
          },
          {
            text: i18n.t('lostrpg_character_common_stamina'),
            panel: false,
            number: character.stamina,
          },
          {
            text: i18n.t('lostrpg_character_common_willPowerBase'),
            panel: false,
            number: character.willPowerBase,
          },
          {
            text: i18n.t('lostrpg_character_common_willPower'),
            panel: false,
            number: character.willPower,
          },
          {
            text: i18n.t('lostrpg_character_common_carryingCapacity'),
            panel: false,
            number: character.carryingCapacity,
          },
        ],
      },
      {
        type: 'charaSheetInputCloneNote',
        title: i18n.t('lostrpg_character_common_appearance'),
        forms: [
          {
            textarea: character.appearance,
          },
        ],
      },
      {
        type: 'charaSheetInputCloneCheckTable',
        title: i18n.t('lostrpg_character_common_specialty'),
        array_th: heads.map((t) => ({ t, c: false, k: 1 })),
        array_tr: specialityList,
      },
      {
        type: 'charaSheetInputCloneTextTable',
        title: i18n.t('lostrpg_character_common_ability'),
        array_th: abilitiesColumns,
        array_tr: character.abilities.map((a) => [
          a.name,
          a.group,
          a.type,
          a.specialty,
          a.target || '',
          a.recoil,
          a.effect,
        ]),
      },
      {
        type: 'charaSheetInputCloneTextTable',
        title: i18n.t('lostrpg_character_common_equipment'),
        array_th: [i18n.t('common_name'), ...equipmentColumns],
        array_tr: character.equipments.map((a) => [
          a.name,
          a.type,
          a.specialty,
          a.target || '',
          a.trait,
          a.effect,
        ]),
      },
      {
        type: 'charaSheetInputCloneTextTable',
        title: i18n.t('lostrpg_character_common_item'),
        array_th: itemsColumns,
        array_tr: character.items.map((a) => [
          a.name,
          a.number,
          a.j,
          a.weight,
          a.type,
          a.area,
          a.specialty,
          a.target,
          a.trait,
          a.effect,
        ]),
      },
    ],
  }
  character.bags.forEach((bag) => {
    result.array_forms.push({
      type: 'charaSheetInputCloneTextTable',
      title: bag.name,
      array_th: itemsColumns,
      array_tr: bag.items.map((a) => [
        a.name,
        a.number,
        a.weight,
        a.type,
        a.area,
        a.specialty,
        a.target,
        a.trait,
        a.effect,
      ]),
    })
  })
  result.array_forms.push({
    type: 'charaSheetInputCloneNote',
    title: i18n.t('common_detail'),
    forms: [
      {
        textarea: character.freeWriting,
      },
    ],
  })

  return JSON.stringify(result)
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
    const campLimit = 100
    const i18n = useI18n()
    const authUser = useAuth()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const character = useCharacter()
    const camps = useCamps()
    const id = getIdFromQuery(router)
    const beforePage = `/lostrpg/characters/${i18n.activeLocale}/list`
    const updateRowData = (prop: string, toNextState: (d: any[]) => any[]) => {
      const newData = { ...character }
      newData[prop] = toNextState([...character[prop]])
      dispatch(setCharacter(newData))
    }
    const updateRowDataBags = (bag: Bag, toNextState: (d: any[]) => any[]) => {
      dispatch(setCharacterBag({ ...bag, items: toNextState([...bag.items]) }))
    }
    // Validation State
    const [isValidError, setIsValidError] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    // Image State
    const [prevUrl, setPrevUrl] = useState('')
    const [file, setFile] = useState<File>(null)
    const setImageFile = createSetImageFile(setFile, setPrevUrl)
    const handleOnDrop = (files: File[]) => {
      setImageFile(files[0])
    }

    const editHandler = async () => {
      if (!character.name) {
        setIsValidError(true)
        window.scrollTo(0, 0)
        return
      }
      if (isSubmit) return
      setIsSubmit(true)

      let retId = id
      if (!retId) {
        retId = await createCharacter(
          { ...character, uid: authUser.uid },
          authUser,
          file,
        )
      } else {
        await updateCharacter(
          id,
          { ...character, uid: authUser.uid },
          authUser.uid,
          file,
        )
      }

      Router.push(
        {
          pathname: `/lostrpg/public/[lng]/[view]`,
          query: { id: retId },
        },
        `/lostrpg/public/${i18n.activeLocale}/character?id=${retId}`,
      )
    }

    const deleteHandler = async () => {
      if (confirm(t('message_are_you_sure_remove'))) {
        await deleteCharacter(id, authUser.uid)
        Router.push(beforePage)
      }
    }

    useEffect(() => {
      // /lostrpg/public/[lng]/[view] では編集機能がない

      if (router.pathname.includes('view')) return
      if (!authUser || (id && !canEdit(authUser, character))) {
        Router.push(beforePage)
      }
      dispatch(setLocale(i18n.activeLocale))
      dispatch(fetchCamps(campLimit))

      if (!id) {
        dispatch(
          setCharacter({ ...initCharacter, playerName: authUser.displayName }),
        )
        return
      }
      dispatch(fetchCharactersRecords(id))
      ;(async () => {
        const data = await getCharacter(id)

        if (data) {
          dispatch(setCharacter(data))
          if (data.imageUrl) setPrevUrl(data.imageUrl)
        }
      })()
    }, [])

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
    const damagedParts = damageBodyParts(bodyParts, character)
    const makedStatusAilments = makeStatusAilments(character, statusAilments)
    const imgId = 'character-image'
    const makedSpecialtiesRows = specialtiesTableRows(
      bodyParts,
      specialties,
      character,
    )

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
      specialtiesTableRows: makedSpecialtiesRows,
      damageBodyParts: damagedParts,
      itemsColumns,
      items: mergedItemList,
      equipmentColumns,
      equipments: equipments(character, i18n),
      statusAilments: makedStatusAilments,
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
      imgId,
      exportXml: async () => {
        let identifier = ''
        const files: File[] = []
        if (character.imageUrl) {
          const response = await fetch(character.imageUrl, { method: 'GET' })
          const blob = await response.blob()
          identifier = await calcSHA256Async(blob)

          files.push(
            new File([blob], identifier + '.' + MimeType.extension(blob.type), {
              type: blob.type,
            }),
          )
        }
        const doc = characterToDoc(
          character,
          damagedParts,
          makedStatusAilments,
          i18n,
          identifier,
        )
        const sXML = convertDocToXML(doc)

        files.push(new File([sXML], 'data.xml', { type: 'text/plain' }))
        FileArchiver.instance.save(files, character.name)
      },
      exportJson: async () => {
        // const identifier = ''

        const json = characterToTRPGStudioDoc(
          character,
          damagedParts,
          makedStatusAilments,
          i18n,
          specialtiesTableColumns,
          specialties,
          abilitiesColumns.map((a) => a.title),
          equipmentColumns.map((e) => e.title),
          itemsColumns.map((i) => i.title),
        )

        const file = new File([json], `${character.name}.txt`, {
          type: 'text/plain',
        })

        FileArchiver.instance.saveText(file)
      },
      authUser,
      i18n,
      id,
      character,
      camps,
      isValidError,
      characterNameHelperText:
        character.name || !isValidError ? '' : t('message_required'),
      prevUrl,
      beforePage,
      playerNameHandler: (e) =>
        dispatch(setCharacter({ ...character, playerName: e.target.value })),
      useStrangeFieldHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            useStrangeField: e.target.checked,
          }),
        ),
      useDragonPlainHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            useDragonPlain: e.target.checked,
          }),
        ),
      campHandler: (item: { id: string; name: string } | null) => {
        if (item) {
          dispatch(
            setCharacter({
              ...character,
              campName: item.name,
              campId: item.id,
            }),
          )
          return
        }
        dispatch(
          setCharacter({
            ...character,
            campName: '',
            campId: '',
          }),
        )
      },
      characterNameHandler: (e) =>
        dispatch(setCharacter({ ...character, name: e.target.value })),
      handleOnDrop,
      classHandler: (item: CharacterClass | null) => {
        item &&
          dispatch(
            setCharacter({
              ...character,
              classes: [...character.classes, item],
            }),
          )
      },
      classItemHandler: (item) => {
        dispatch(
          setCharacter({
            ...character,
            classes: character.classes.filter((i) => i.name !== item.name),
          }),
        )
      },
      specialtiesHandler: () =>
        dispatch(setCharacter({ ...character, damagedSpecialties: [] })),
      gapHandler: (name) => {
        const gaps = character.gaps.includes(name)
          ? character.gaps.filter((item) => item !== name)
          : [...character.gaps, name]
        dispatch(
          setCharacter({
            ...character,
            gaps,
          }),
        )
      },
      specialtyHandler: (name) => {
        const specialties = character.specialties.includes(name)
          ? character.specialties.filter((item) => item !== name)
          : [...character.specialties, name]
        dispatch(
          setCharacter({
            ...character,
            specialties,
          }),
        )
      },
      damageHandler: (name) => dispatch(toggleCharacterDamage(name)),
      abilitySelectHandler: (item: Ability | null) => {
        item &&
          dispatch(
            setCharacter({
              ...character,
              abilities: [...character.abilities, item],
            }),
          )
      },
      abilityAddhandler: (newData) => {
        updateRowData('abilities', (d) => [...d, newData])
      },
      abilityUpdateHandler: (newData, oldData) => {
        updateRowData('abilities', (d) => {
          d[d.findIndex((i) => i.name === oldData.name)] = newData
          return d
        })
      },
      abilityDeleteHandler: (oldData) => {
        updateRowData('abilities', (d) => {
          d.splice(
            d.findIndex((i) => i.name === oldData.name),
            1,
          )
          return d
        })
      },
      staminaBaseHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            staminaBase: Number(e.target.value),
          }),
        ),
      staminaHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            stamina: Number(e.target.value),
          }),
        ),
      willPowerBaseHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            willPowerBase: Number(e.target.value),
          }),
        ),
      willPowerHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            willPower: Number(e.target.value),
          }),
        ),
      carryingCapacityHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            carryingCapacity: Number(e.target.value),
          }),
        ),
      itemSelectHandler: (item: Item | null) => {
        item &&
          dispatch(
            setCharacter({
              ...character,
              items: [
                ...character.items,
                { ...item, id: _.uniqueId(item.name), number: 1 },
              ],
            }),
          )
      },
      addItemHandler: (newData) => {
        updateRowData('items', (d) => [
          ...d,
          { ...newData, id: _.uniqueId(newData.name) },
        ])
      },
      updateItemHandler: (newData, oldData) => {
        updateRowData('items', (d) => {
          d[d.findIndex((i) => i.id === oldData.id)] = newData
          return d
        })
      },
      deleteItemHandler: (oldData) => {
        updateRowData('items', (d) => {
          d.splice(
            d.findIndex((i) => i.id === oldData.id),
            1,
          )
          return d
        })
      },
      addBagHandler: () =>
        dispatch(
          setCharacter({
            ...character,
            bags: [
              ...character.bags,
              { ...initBag, id: _.uniqueId(initBag.id) },
            ],
          }),
        ),
      bagChangeHandler: (e, bag) =>
        dispatch(
          setCharacterBag({
            ...bag,
            name: e.target.value,
          }),
        ),
      bagRemoveHandler: (bag) => {
        if (!confirm(t('message_are_you_sure_remove'))) return
        dispatch(
          setCharacter({
            ...character,
            bags: character.bags.filter((b) => b.id !== bag.id),
          }),
        )
      },
      bagCapacityHandler: (e, bag) =>
        dispatch(
          setCharacterBag({
            ...bag,
            capacity: Number(e.target.value),
          }),
        ),
      bagItemSelectHandler: (item: Item | null, bag) => {
        item &&
          dispatch(
            setCharacterBag({
              ...bag,
              items: [
                ...bag.items,
                {
                  ...item,
                  id: _.uniqueId(item.name),
                  number: 1,
                },
              ],
            }),
          )
      },
      addBagItemHandler: (newData, bag) => {
        updateRowDataBags(bag, (d) => [
          ...d,
          { ...newData, id: _.uniqueId(newData.name) },
        ])
      },
      updateBagItemHandler: (newData, oldData, bag) => {
        updateRowDataBags(bag, (d) => {
          d[d.findIndex((i) => i.id === oldData.id)] = newData
          return d
        })
      },
      deleteBagItemHandler: (oldData, bag) => {
        updateRowDataBags(bag, (d) => {
          d.splice(
            d.findIndex((i) => i.id === oldData.id),
            1,
          )
          return d
        })
      },
      equipmentChangeHandler: (item: Item | null, rowData) => {
        let data = {
          ...character,
          equipments: character.equipments.filter(
            (i) => i.equipedArea !== rowData['equipedArea'],
          ),
        }
        if (item) {
          data = {
            ...character,
            equipments: [
              ...data.equipments,
              {
                ...item,
                id: _.uniqueId(item.name),
                equipedArea: rowData['equipedArea'],
              },
            ],
          }
        }

        dispatch(setCharacter(data))
      },
      statusAilmentsHandler: (rowData) =>
        dispatch(
          setCharacter({
            ...character,
            statusAilments: rowData['isChecked']
              ? character.statusAilments.filter(
                  (name) => name !== rowData['name'],
                )
              : [...character.statusAilments, rowData['name']],
          }),
        ),
      backboneHandler: (item: any) => {
        item &&
          dispatch(
            setCharacter({
              ...character,
              backbones: [...character.backbones, item],
            }),
          )
      },
      addBackBoneHandler: (newData) => {
        updateRowData('backbones', (d) => [...d, newData])
      },
      updateBackboneHandler: (newData, oldData) => {
        updateRowData('backbones', (d) => {
          d[d.findIndex((i) => i.name === oldData.name)] = newData
          return d
        })
      },
      deleteBackboneHandler: (oldData) => {
        updateRowData('backbones', (d) => {
          d.splice(
            d.findIndex((i) => i.name === oldData.name),
            1,
          )
          return d
        })
      },
      unUsedExperienceHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            unusedExperience: Number(e.target.value),
          }),
        ),
      totalExperienceHandler: (e) =>
        dispatch(
          setCharacter({
            ...character,
            totalExperience: Number(e.target.value),
          }),
        ),
      summaryHandler: (v) =>
        dispatch(setCharacter({ ...character, summary: v })),
      appearanceHandler: (v) =>
        dispatch(setCharacter({ ...character, appearance: v })),
      freeWritingHandler: (v) =>
        dispatch(setCharacter({ ...character, freeWriting: v })),
      quoteHandler: (e) =>
        dispatch(setCharacter({ ...character, quote: e.target.value })),
      editHandler,
      deleteHandler,
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
