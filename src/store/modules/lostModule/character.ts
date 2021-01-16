import { useState, useEffect, useCallback, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import range from 'lodash/range'
import uniq from 'lodash/uniq'
import uniqueId from 'lodash/uniqueId'
import union from 'lodash/union'
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
import lostModule, {
  setCharacter,
  toggleCharacterDamage,
  setCharacterBag,
  setLocale,
  fetchCamps,
  useCamps,
} from '~/store/modules/lostModule'
import { createAuthClientSide, useAuth } from '~/store/modules/authModule'
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

export interface Backbone {
  name: string
  type: string
  effect: string
  // id: string // テーブルで編集するとき用のユニークなID
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
export const useCharacter = (): Character =>
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

  return range(11).map((y) => ({
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

export const characterToDoc = (
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

export const characterToTRPGStudioDoc = (
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
  const specialityList = range(11).map((y) =>
    range(6).map((x) => makeData(specialties[y + 11 * x])),
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

export const equipments = (character: Character, i18n) => {
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

export const makeStatusAilments = (
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
    const handleOnDrop = useCallback(
      (files: File[]) => {
        setImageFile(files[0])
      },
      [file],
    )
    // editable table
    const [abilityTableCount, setAbilityTableCount] = useState(0)
    const [itemTableEditCount, setItemTableEditCount] = useState(0)
    const [bagTableEditCount, setBagTableEditCount] = useState(0)
    const [equipmentTableEditCount, setEquipmentTableEditCount] = useState(0)

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
      if (i18n.activeLocale === 'ja') {
        setTimeout(
          () =>
            (window.location.href = `/lostrpg/public/ja/characters/${retId}`),
          2000,
        )
        return
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
      if (!authUser) {
        // return Router.push(beforePage)
        dispatch(createAuthClientSide())
        return
      }
      if (id && !canEdit(authUser, character)) {
        // return Router.push(
        //   {
        //     pathname: `/lostrpg/public/[lng]/[view]`,
        //     query: { id },
        //   },
        //   `/lostrpg/public/${i18n.activeLocale}/character?id=${id}`,
        // )
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
    }, [authUser?.uid])

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
      dragonPlainItemList,
      dragonPlainAbilityList,
      dragonPlainGreaterItemList,
    } = useMemo(
      () => (i18n.activeLocale === defaultLanguage ? lostData : lostDataEn),
      [],
    )
    const mergedClassList = useMemo(() => {
      if (character.useStrangeField) {
        return union(classList, strangeFieldsClassList)
      }
      return classList
    }, [character?.useStrangeField])
    const mergedAbilities = useMemo(() => {
      if (character.useStrangeField && character.useDragonPlain) {
        return union(
          abilityList,
          strangeFieldsAbilityList,
          trophyAbilityList,
          dragonPlainAbilityList,
        )
      }
      if (character.useStrangeField) {
        return union(abilityList, strangeFieldsAbilityList, trophyAbilityList)
      }
      if (character.useDragonPlain) {
        return union(abilityList, dragonPlainAbilityList)
      }
      return abilityList
    }, [character?.useStrangeField, character.useDragonPlain])
    const mergedItemList = useMemo(() => {
      if (character.useStrangeField && character.useDragonPlain) {
        return union(
          items,
          strangeFieldsItemList,
          dragonPlainItemList,
          dragonPlainGreaterItemList,
        )
      }
      if (character.useStrangeField) {
        return union(items, strangeFieldsItemList)
      }
      if (character.useDragonPlain) {
        return union(items, dragonPlainItemList, dragonPlainGreaterItemList)
      }
      return items
    }, [character?.useStrangeField, character.useDragonPlain])

    const trophies = useMemo(
      () => uniq(state.lost.records.map((i) => i.trophy)),
      [state.lost.records.length],
    )
    const damagedParts = useMemo(() => damageBodyParts(bodyParts, character), [
      character.damagedSpecialties.length,
    ])
    const makedStatusAilments = useMemo(
      () => makeStatusAilments(character, statusAilments),
      [character?.statusAilments.length],
    )
    const imgId = 'character-image'
    const makedSpecialtiesRows = useMemo(
      () => specialtiesTableRows(bodyParts, specialties, character),
      [character?.specialties, character.gaps, character.damagedSpecialties],
    )
    const itemsValue = useMemo(
      () => character.items.reduce((sum, { j, number }) => sum + j * number, 0),
      [itemTableEditCount],
    )
    const bagsValue = useMemo(
      () =>
        character.bags
          .map((bag) => bag.items)
          .flat()
          .reduce((sum, { j, number }) => sum + j * number, 0),
      [bagTableEditCount],
    )
    const equipmentValue = useMemo(
      () => character.equipments.reduce((sum, { j }) => sum + j, 0),
      [equipmentTableEditCount, character.equipments.length],
    )
    const totalValue = itemsValue + bagsValue + equipmentValue
    const equipmentsList = useMemo(() => equipments(character, i18n), [
      equipmentTableEditCount,
    ])
    return {
      classList: useMemo(() => {
        return mergedClassList.filter(
          (item) => character.classes.findIndex((i) => i.id === item.id) === -1,
        )
      }, [character?.classes.length]),
      abilitiesColumns,
      abilityList: useMemo(
        () =>
          mergedAbilities
            .filter(
              (item) =>
                item.id === 'general' ||
                character.classes.findIndex((c) => c.id === item.id) !== -1 ||
                trophies.includes(item.name),
            )
            .map((item) => item.list)
            .flat()
            .filter(
              (item) =>
                character.abilities.findIndex((i) => i.name === item.name) ===
                -1,
            ),
        [
          character.abilities.length,
          character.classes.length,
          mergedAbilities.length,
        ],
      ),
      specialtiesTableColumns: useMemo(
        () => makeSpecialtiesTableColumns(specialtiesTableColumns, character),
        [character?.gaps],
      ),
      specialtiesTableRows: makedSpecialtiesRows,
      damageBodyParts: damagedParts,
      itemsColumns,
      items: useMemo(() => mergedItemList, [mergedItemList.length]),
      equipmentColumns,
      equipments: equipmentsList,
      equipmentMap: useMemo(() => {
        const m = new Map<string, Item[]>()
        for (const rowData of equipmentsList) {
          const area = rowData['equipedArea']
          const items = mergedItemList.filter(
            (i) =>
              i.area === area ||
              ([
                t('lostrpg_character_common_rightHand'),
                t('lostrpg_character_common_leftHand'),
              ].includes(area) &&
                [
                  t('lostrpg_character_common_oneHand'),
                  t('lostrpg_character_common_twoHand'),
                ].includes(i.area)),
          )
          m.set(area, items)
        }
        return m
      }, [mergedItemList.length]),
      statusAilments: makedStatusAilments,
      totalWeight: useMemo(
        () =>
          character.items.reduce(
            (sum, { weight, number }) => sum + weight * number,
            0,
          ),
        [itemTableEditCount],
      ),
      totalValue,
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
      abilityTableCount,
      itemTableEditCount,
      playerNameHandler: useCallback(
        (e) => dispatch(lostModule.actions.setPlayerName(e.target.value)),
        [],
      ),
      useStrangeFieldHandler: useCallback(
        (e) =>
          dispatch(lostModule.actions.setUseStrangeField(e.target.checked)),
        [],
      ),
      useDragonPlainHandler: useCallback(
        (e) => dispatch(lostModule.actions.setUseDragonPlain(e.target.checked)),
        [],
      ),
      campHandler: useCallback((item: { id: string; name: string } | null) => {
        if (item) {
          dispatch(lostModule.actions.setCharacterCamp(item))
          return
        }
        dispatch(
          lostModule.actions.setCharacterCamp({
            name: '',
            id: '',
          }),
        )
      }, []),
      characterNameHandler: useCallback(
        (e) => dispatch(lostModule.actions.setCharacterName(e.target.value)),
        [character?.name],
      ),
      handleOnDrop,
      classHandler: useCallback((item: CharacterClass | null) => {
        item && dispatch(lostModule.actions.setCharacterClass(item))
      }, []),
      classItemHandler: useCallback((item) => {
        dispatch(lostModule.actions.deleteCharacterClass(item))
      }, []),
      specialtiesHandler: () =>
        dispatch(setCharacter({ ...character, damagedSpecialties: [] })),
      gapHandler: useCallback((name) => {
        dispatch(lostModule.actions.toggleCharacterGap(name))
      }, []),
      specialtyHandler: useCallback((name) => {
        dispatch(lostModule.actions.toggleCharacterSpecial(name))
      }, []),
      damageHandler: useCallback(
        (name) => dispatch(toggleCharacterDamage(name)),
        [],
      ),
      abilitySelectHandler: useCallback((item: Ability | null) => {
        item && dispatch(lostModule.actions.addAbility(item))
      }, []),
      abilityAddhandler: useCallback((item: Ability | null) => {
        item && dispatch(lostModule.actions.addAbility(item))
      }, []),
      abilityUpdateHandler: useCallback(
        (newData, oldData) => {
          dispatch(lostModule.actions.updateAbility({ newData, oldData }))
          setAbilityTableCount(abilityTableCount + 1)
        },
        [abilityTableCount],
      ),
      abilityDeleteHandler: useCallback((oldData) => {
        dispatch(lostModule.actions.deleteAbility(oldData))
      }, []),
      staminaBaseHandler: useCallback(
        (e) =>
          dispatch(lostModule.actions.setStaminaBase(Number(e.target.value))),
        [],
      ),
      staminaHandler: useCallback(
        (e) => dispatch(lostModule.actions.setStamina(Number(e.target.value))),
        [],
      ),
      willPowerBaseHandler: useCallback(
        (e) =>
          dispatch(lostModule.actions.setWillPowerBase(Number(e.target.value))),
        [],
      ),
      willPowerHandler: useCallback(
        (e) =>
          dispatch(lostModule.actions.setWillPower(Number(e.target.value))),
        [],
      ),
      carryingCapacityHandler: useCallback(
        (e) =>
          dispatch(
            lostModule.actions.setCarryingCapacity(Number(e.target.value)),
          ),
        [],
      ),
      itemSelectHandler: useCallback(
        (item: Item | null) => {
          setItemTableEditCount(itemTableEditCount + 1)
          item &&
            dispatch(
              lostModule.actions.addItem({
                ...item,
                id: uniqueId(item.name),
                number: 1,
              }),
            )
        },
        [itemTableEditCount],
      ),
      addItemHandler: useCallback(
        (newData) => {
          setItemTableEditCount(itemTableEditCount + 1)
          dispatch(
            lostModule.actions.addItem({
              ...newData,
              id: uniqueId(newData.name),
            }),
          )
        },
        [itemTableEditCount],
      ),
      updateItemHandler: useCallback(
        (newData, oldData) => {
          dispatch(lostModule.actions.updateItem({ newData, oldData }))
          setItemTableEditCount(itemTableEditCount + 1)
        },
        [itemTableEditCount],
      ),
      deleteItemHandler: useCallback(
        (oldData) => {
          setItemTableEditCount(itemTableEditCount + 1)
          dispatch(lostModule.actions.deleteItem(oldData))
        },
        [itemTableEditCount],
      ),
      addBagHandler: useCallback(() => {
        setBagTableEditCount(bagTableEditCount + 1)
        dispatch(
          lostModule.actions.addCharacterBag({
            ...initBag,
            id: uniqueId(initBag.id),
          }),
        )
      }, [bagTableEditCount]),
      bagChangeHandler: useCallback(
        (e, bag) =>
          dispatch(
            setCharacterBag({
              ...bag,
              name: e.target.value,
            }),
          ),
        [],
      ),
      bagRemoveHandler: useCallback((bag) => {
        if (!confirm(t('message_are_you_sure_remove'))) return
        dispatch(lostModule.actions.removeCharacterBag(bag))
      }, []),
      bagCapacityHandler: useCallback(
        (e, bag) =>
          dispatch(
            setCharacterBag({
              ...bag,
              capacity: Number(e.target.value),
            }),
          ),
        [],
      ),
      bagItemSelectHandler: useCallback(
        (item: Item | null, bag) => {
          setItemTableEditCount(itemTableEditCount + 1)
          item &&
            dispatch(
              setCharacterBag({
                ...bag,
                items: [
                  ...bag.items,
                  {
                    ...item,
                    id: uniqueId(item.name),
                    number: 1,
                  },
                ],
              }),
            )
        },
        [itemTableEditCount],
      ),
      addBagItemHandler: useCallback(
        (newData, bag) => {
          setBagTableEditCount(bagTableEditCount + 1)
          updateRowDataBags(bag, (d) => [
            ...d,
            { ...newData, id: uniqueId(newData.name) },
          ])
        },
        [bagTableEditCount],
      ),
      updateBagItemHandler: useCallback((newData, oldData, bag) => {
        updateRowDataBags(bag, (d) => {
          d[d.findIndex((i) => i.id === oldData.id)] = newData
          return d
        })
      }, []),
      deleteBagItemHandler: useCallback((oldData, bag) => {
        updateRowDataBags(bag, (d) => {
          d.splice(
            d.findIndex((i) => i.id === oldData.id),
            1,
          )
          return d
        })
      }, []),
      equipmentChangeHandler: useCallback(
        (item: Item | null, rowData) => {
          setEquipmentTableEditCount(equipmentTableEditCount + 1)
          if (item) {
            dispatch(
              lostModule.actions.addCharacterEquipment({
                ...item,
                id: uniqueId(item.name),
                equipedArea: rowData['equipedArea'],
              }),
            )
            return
          }
          dispatch(
            lostModule.actions.removeCharacterEquipment(rowData['equipedArea']),
          )
        },
        [equipmentTableEditCount],
      ),
      statusAilmentsHandler: useCallback((rowData) => {
        if (rowData['isChecked']) {
          dispatch(lostModule.actions.removeStatusAilment(rowData['name']))
          return
        }
        dispatch(lostModule.actions.addStatusAilment(rowData['name']))
      }, []),
      backboneHandler: useCallback((item: Backbone | null) => {
        item && dispatch(lostModule.actions.addCharacterBackbone(item))
      }, []),
      addBackBoneHandler: useCallback((newData: Backbone) => {
        dispatch(lostModule.actions.addCharacterBackbone(newData))
      }, []),
      updateBackboneHandler: useCallback((newData, oldData) => {
        dispatch(
          lostModule.actions.updateCharacterBackbone({ newData, oldData }),
        )
      }, []),
      deleteBackboneHandler: useCallback((oldData) => {
        dispatch(lostModule.actions.deleteCharacterBackbone(oldData))
      }, []),
      unUsedExperienceHandler: useCallback((e) => {
        dispatch(lostModule.actions.setUnUsedExperience(Number(e.target.value)))
      }, []),
      totalExperienceHandler: useCallback((e) => {
        dispatch(lostModule.actions.setTotalExperience(Number(e.target.value)))
      }, []),
      summaryHandler: (v) =>
        dispatch(lostModule.actions.setCharacterSummary(v)),
      appearanceHandler: (v) =>
        dispatch(lostModule.actions.setCharacterAppearance(v)),
      freeWritingHandler: (v) =>
        dispatch(lostModule.actions.setCharacterFreeWriting(v)),
      quoteHandler: (e) =>
        dispatch(lostModule.actions.setCharacterQuote(e.target.value)),
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
