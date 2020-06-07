import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  createBoss,
  updateBoss,
  deleteBoss,
  readBosses,
  getBoss,
  readPrivateBosses,
} from '~/firestore/boss'
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
import type { Ability } from './character'
import type { LostModule } from './index'
import {
  setPagenationLoading,
  paginationLoaded,
  setError,
  useListPagination,
  toggleBossDamage,
  setBoss,
  setLocale,
  setBosses,
  addBosses,
} from './index'
import {
  damageBodyParts,
  specialtiesTableRows,
  makeSpecialtiesTableColumns,
} from './character'
export interface Boss {
  name: string
  level: number
  specialties: string[]
  abilities: Ability[]
  gaps: ('A' | 'B' | 'C' | 'D' | 'E')[]
  statusAilments: string[]
  stamina: number
  willPower: number
  damagedSpecialties: string[]
  freeWriting?: string
  summary?: string
  isPublish?: boolean
  creatorName?: string
  uid?: string
  imageUrl?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}

export const initBoss: Boss = {
  name: '',
  level: 3,
  specialties: [],
  abilities: [],
  gaps: [],
  statusAilments: [],
  stamina: 15,
  willPower: 13,
  damagedSpecialties: [],
  summary: '',
  freeWriting: '',
  creatorName: '',
  createdAt: '',
  updatedAt: '',
  uid: '',
  isPublish: false,
  id: null,
}
// state
const useBoss = () =>
  useSelector((state: { lost: LostModule }) => state.lost.boss)
const useBosses = () =>
  useSelector((state: { lost: LostModule }) => state.lost.bosses)

// thunks
interface BossesLoaded {
  bosses: { name: string; id: string }[]
  next: string
  hasMore: boolean
}

const fetchBossesCommon = async (
  next,
  limit,
  dispatch,
  action,
  searchName,
  uid = null,
) => {
  dispatch(setPagenationLoading(true))
  try {
    const ret: BossesLoaded = await readBosses(next, limit, searchName)
    const privateData = uid ? await readPrivateBosses(uid) : []
    dispatch(paginationLoaded(ret))
    dispatch(action([...privateData, ...ret.bosses]))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setPagenationLoading(false))
  }
}
const fetchBosses = (
  limit: number,
  searchName = '',
  uid = null,
): AppThunk => async (dispatch) => {
  await fetchBossesCommon(null, limit, dispatch, setBosses, searchName, uid)
}

const fetchBossesMore = (
  next: string,
  limit: number,
  searchName: string,
): AppThunk => async (dispatch) => {
  await fetchBossesCommon(next, limit, dispatch, addBosses, searchName)
}

const fetchBoss = (id: string): AppThunk => async (dispatch) => {
  const data = await getBoss(id)
  dispatch(setBoss(data))
}

// ViewModel
export const useBossEditViewModel = (bossId?: string) =>
  useSelector((state: { lost: LostModule }) => {
    // Validation State
    const [isValidError, setIsValidError] = useState(false)
    const [file, setFile] = useState<File>(null)
    const [isSubmit, setIsSubmit] = useState(false)
    const [abilityFilter, setAbilityFilter] = useState('')
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const boss = useBoss()
    const beforePage = `/lostrpg/bosses/${i18n.activeLocale}/list`
    const {
      specialties,
      bodyParts,
      specialtiesTableColumns,
      abilitiesColumns,
      abilityList,
      strangeFieldsAbilityList,
      trophyAbilityList,
      enemyAbilityList,
      statusAilments,
      strangeFieldsEnemyAbilityList,
    } = i18n.activeLocale === defaultLanguage ? lostData : lostDataEn
    const id = bossId || (router.query.id as string)
    const mergedAbilities = _.union(
      enemyAbilityList,
      strangeFieldsEnemyAbilityList,
      abilityList,
      strangeFieldsAbilityList,
      trophyAbilityList,
    )
    const filteredAbilities = mergedAbilities
      .filter((item) => abilityFilter === '' || item.name === abilityFilter)
      .map((item) => item.list)
      .flat()

    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])
    useEffect(() => {
      if (!id && authUser) {
        dispatch(
          setBoss({
            ...initBoss,
            creatorName: authUser.displayName,
            specialties,
          }),
        )
      }
      if (id && authUser) {
        dispatch(fetchBoss(id))
      }
    }, [authUser])
    const dispatchSetBoss = (e, prop: string) => {
      const r = { ...boss }
      if (typeof r[prop] === 'number') {
        r[prop] = Number(e.target.value)
      } else {
        r[prop] = e.target.value
      }
      dispatch(setBoss(r))
    }
    const updateRowData = (prop: string, toNextState: (d: any[]) => any[]) => {
      const newData = { ...boss }
      newData[prop] = toNextState([...boss[prop]])
      dispatch(setBoss(newData))
    }
    return {
      i18n,
      authUser,
      boss,
      isValidError,
      specialtiesTableColumns: makeSpecialtiesTableColumns(
        specialtiesTableColumns,
        boss,
      ),
      specialtiesTableRows: specialtiesTableRows(bodyParts, specialties, boss),
      abilityList: filteredAbilities,
      abilitiesColumns,
      abilityClasses: _.uniqWith(
        mergedAbilities.map(({ id, name }) => ({ id, name })),
        _.isEqual,
      ),
      abilityFilter,
      statusAilments: statusAilments.map(({ name, effect }) => ({
        name,
        effect,
        isChecked: boss.statusAilments.includes(name),
      })),
      damageBodyParts: damageBodyParts(bodyParts, boss),
      beforePage,
      id,
      creatorNameHandler: (e) => dispatchSetBoss(e, 'creatorName'),
      bossNameHandler: (e) => dispatchSetBoss(e, 'name'),
      levelHandler: (e) => {
        const value = Number(e.target.value)
        dispatch(
          setBoss({
            ...boss,
            level: value,
            stamina: value * 5,
            willPower: 10 + value,
          }),
        )
      },
      staminaHandler: (e) => dispatchSetBoss(e, 'stamina'),
      willPowerHandler: (e) => dispatchSetBoss(e, 'willPower'),
      summaryHandler: (v: string) => dispatch(setBoss({ ...boss, summary: v })),
      freeWritingHandler: (v: string) =>
        dispatch(setBoss({ ...boss, freeWriting: v })),
      damageHandler: (name) => dispatch(toggleBossDamage(name)),
      gapHandler: (name) => {
        const gaps = boss.gaps.includes(name)
          ? boss.gaps.filter((item) => item !== name)
          : [...boss.gaps, name]
        dispatch(
          setBoss({
            ...boss,
            gaps,
          }),
        )
      },
      specialtyHandler: (name) => {
        const specialties = boss.specialties.includes(name)
          ? boss.specialties.filter((item) => item !== name)
          : [...boss.specialties, name]
        dispatch(
          setBoss({
            ...boss,
            specialties,
          }),
        )
      },
      resetDamageHandler: () =>
        dispatch(setBoss({ ...boss, damagedSpecialties: [] })),
      selectAbilityHandler: (item: Ability | null) => {
        item &&
          dispatch(
            setBoss({
              ...boss,
              abilities: [...boss.abilities, item],
            }),
          )
      },
      abilityFilterHandler: (item) => item && setAbilityFilter(item.name),
      rowAddHandler: (newData) => {
        updateRowData('abilities', (d) => [...d, newData])
      },
      rowUpdateHandler: (newData, oldData) => {
        updateRowData('abilities', (d) => {
          d[d.findIndex((i) => i.name === oldData.name)] = newData
          return d
        })
      },
      rowDeleteHandler: (oldData) => {
        updateRowData('abilities', (d) => {
          d.splice(
            d.findIndex((i) => i.name === oldData.name),
            1,
          )
          return d
        })
      },
      statusAilmentsHandler: (rowData) =>
        dispatch(
          setBoss({
            ...boss,
            statusAilments: rowData['isChecked']
              ? boss.statusAilments.filter((name) => name !== rowData['name'])
              : [...boss.statusAilments, rowData['name']],
          }),
        ),
      setImageHandler: (file: File) => setFile(file),
      editHandler: async () => {
        if (!boss.name) {
          setIsValidError(true)
          window.scrollTo(0, 0)
          return
        }
        if (isSubmit) return
        setIsSubmit(true)

        let retId = id
        if (!retId) {
          retId = await createBoss(
            { ...boss, uid: authUser.uid },
            authUser,
            file,
          )
        } else {
          await updateBoss(
            id,
            { ...boss, uid: authUser.uid },
            authUser.uid,
            file,
          )
        }

        Router.push(
          {
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: { id: retId },
          },
          `/lostrpg/public/${i18n.activeLocale}/boss?id=${retId}`,
        )
      },
      deleteHandler: async () => {
        if (confirm(t('message_are_you_sure_remove'))) {
          await deleteBoss(id, authUser.uid)
          Router.push(beforePage)
        }
      },
      publishHandler: (e) =>
        dispatch(
          setBoss({
            ...boss,
            isPublish: e.target.checked,
          }),
        ),
    }
  })
export const useBossesViewModel = (bossId?: string) =>
  useSelector((state: { lost: LostModule }) => {
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const bosses = useBosses()
    const beforePage = `/lostrpg`
    const pagination = useListPagination()
    const [search, setSearch] = useState({ name: '' })
    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])
    useEffect(() => {
      if (authUser) {
        dispatch(fetchBosses(pagination.limit, '', authUser.uid))
        return
      }
      dispatch(fetchBosses(pagination.limit))
    }, [authUser])
    return {
      i18n,
      authUser,
      search,
      pagination,
      bosses,
      beforePage,
      searchHandler: (e) => setSearch({ ...search, name: e.target.value }),
      filterHandler: () => dispatch(fetchBosses(pagination.limit, search.name)),
      loadMoreHandler: () =>
        dispatch(
          fetchBossesMore(pagination.lastLoaded, pagination.limit, search.name),
        ),
    }
  })
const bossToDoc = (
  boss: Boss,
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
  const name = createElement(doc, 'data', [['name', 'name']], boss.name)
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
      ['currentValue', boss.stamina],
    ],
    String(boss.stamina * 2),
  )
  const willPower = createElement(
    doc,
    'data',
    [
      ['name', t('lostrpg_character_common_willPower')],
      ['type', 'numberResource'],
      ['currentValue', boss.willPower],
    ],
    String(boss.willPower * 2),
  )
  resource.appendChild(stamina)
  resource.appendChild(willPower)
  detail.appendChild(resource)
  // char detail info
  const info = createElement(doc, 'data', [['name', t('common_info')]])
  info.appendChild(
    createElement(doc, 'data', [['name', 'PL']], boss.creatorName),
  )

  info.appendChild(
    createElement(
      doc,
      'data',
      [
        ['name', t('common_summary')],
        ['type', 'note'],
      ],
      boss.summary,
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
      `https://create-now.now.sh/lostrpg/public/${i18n.activeLocale}/boss?id=${boss.id}`,
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
  boss.specialties.forEach((s, i) => {
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
  boss.abilities.forEach((a) => {
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
      boss.abilities.map((a) => `[${a.name}] {${a.name}}`).join('\n'),
  )
  characterElm.appendChild(palette)
  // add character to doc
  doc.appendChild(characterElm)
  return doc
}

export const useBossViewModel = (bossInit: Boss) =>
  useSelector((state: { lost: LostModule }) => {
    const i18n = useI18n()
    const boss = state.lost.boss
    const dispatch = useDispatch()
    const beforePage = `/lostrpg/bosses/${i18n.activeLocale}/list`
    const {
      specialties,
      bodyParts,
      specialtiesTableColumns,
      abilitiesColumns,
      statusAilments,
    } = i18n.activeLocale === defaultLanguage ? lostData : lostDataEn
    const dispatchSetBoss = (e, prop: string) => {
      const r = { ...boss }
      if (typeof r[prop] === 'number') {
        r[prop] = Number(e.target.value)
      } else {
        r[prop] = e.target.value
      }
      dispatch(setBoss(r))
    }
    useEffect(() => {
      dispatch(setBoss(bossInit))
      dispatch(setLocale(i18n.activeLocale))
    }, [])
    const damagedParts = damageBodyParts(bodyParts, boss)
    const makedStatusAilments = statusAilments.map(({ name, effect }) => ({
      name,
      effect,
      isChecked: boss.statusAilments.includes(name),
    }))
    return {
      boss,
      beforePage,
      i18n,
      specialtiesTableColumns: makeSpecialtiesTableColumns(
        specialtiesTableColumns,
        boss,
      ),
      specialtiesTableRows: specialtiesTableRows(bodyParts, specialties, boss),
      abilitiesColumns,
      statusAilments: makedStatusAilments,
      damageBodyParts: damagedParts,
      damageHandler: (name) => dispatch(toggleBossDamage(name)),
      statusAilmentsHandler: (rowData) =>
        dispatch(
          setBoss({
            ...boss,
            statusAilments: rowData['isChecked']
              ? boss.statusAilments.filter((name) => name !== rowData['name'])
              : [...boss.statusAilments, rowData['name']],
          }),
        ),
      staminaHandler: (e) => dispatchSetBoss(e, 'stamina'),
      willPowerHandler: (e) => dispatchSetBoss(e, 'willPower'),
      exportXml: async () => {
        let identifier = ''
        const files: File[] = []
        if (boss.imageUrl) {
          const response = await fetch(boss.imageUrl, { method: 'GET' })
          const blob = await response.blob()
          identifier = await calcSHA256Async(blob)

          files.push(
            new File([blob], identifier + '.' + MimeType.extension(blob.type), {
              type: blob.type,
            }),
          )
        }
        const doc = bossToDoc(
          boss,
          damagedParts,
          makedStatusAilments,
          i18n,
          identifier,
        )
        const sXML = convertDocToXML(doc)

        files.push(new File([sXML], 'data.xml', { type: 'text/plain' }))
        FileArchiver.instance.save(files, boss.name)
      },
    }
  })
