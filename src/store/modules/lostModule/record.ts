import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { defaultLanguage } from '~/lib/i18n'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import type { LostModule } from './index'
import { getCharacter } from '~/firestore/character'
import {
  createRecord,
  getRecord,
  updateRecord,
  deleteRecord,
} from '~/firestore/record'
import {
  setCharacter,
  setLocale,
  setRecord,
  setPartyMember,
  toggleCharacterDamage,
} from './index'
import { makeSpecialtiesTableColumns, specialtiesTableRows } from './character'

export interface Member {
  name: string
  trophy: string
  memo: string
  id: string
}
const initMember = {
  name: '',
  trophy: '',
  memo: '',
  id: 'member',
}
export interface Record {
  scenarioTitle: string
  gmName: string
  stamina: number
  willPower: number
  damagedSpecialties: string[]
  members: Member[]
  memo?: string
  exp: number
  trophy: string
  characterId: string
  uid?: string
  id?: string
  recordId?: string
  createdAt?: any
  updatedAt?: any
  expChecks: string[]
}

export const initRecord: Record = {
  scenarioTitle: '',
  gmName: '',
  stamina: 0,
  willPower: 0,
  damagedSpecialties: [],
  members: [],
  exp: 0,
  trophy: '',
  expChecks: [],
  memo: '',
  characterId: '',
}
// state
export const useRecord = () =>
  useSelector((state: { lost: LostModule }) => state.lost.record)

// thunks
const fetchData = (characterId: string, id: string): AppThunk => async (
  dispatch,
) => {
  const character = await getCharacter(characterId)
  if (character && !id) {
    dispatch(setCharacter(character))
  }
  if (!id) return

  const record = await getRecord(id)
  if (!record) return
  dispatch(setRecord(record))
  dispatch(
    setCharacter({
      ...character,
      damagedSpecialties: record.damagedSpecialties,
    }),
  )
}

// View Model
const makeExpChecks = (
  record: Record,
  list: { name: string; point: string }[],
) =>
  list.map(({ name, point }) => ({
    name,
    point,
    isChecked: record.expChecks.includes(name),
  }))
export const useRecordViewModel = (recordId?: string, cid?: string) =>
  useSelector((state: { lost: LostModule }) => {
    // Validation State
    const [isValidError, setIsValidError] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [checkSpecialty, setCheckSpecialty] = useState('')
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const record = useRecord()
    const characterId = cid || (router.query.characterId as string)
    const beforePage = `/lostrpg/public/${i18n.activeLocale}/character?id=${characterId}`
    const { character } = state.lost
    const { specialties, bodyParts, specialtiesTableColumns, expCheckPoints } =
      i18n.activeLocale === defaultLanguage ? lostData : lostDataEn
    const id = recordId || (router.query.id as string)
    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])

    useEffect(() => {
      if (!characterId || !authUser) {
        return
      }
      dispatch(fetchData(characterId, id))
    }, [characterId, authUser])

    const dispatchSetRecord = (e, prop: string) => {
      const r = { ...record }
      r[prop] = e.target.value
      dispatch(setRecord(r))
    }
    const dispatchSetPartyMember = (e, member, prop: string) => {
      const m = { ...member }
      m[prop] = e.target.value
      dispatch(setPartyMember(m))
    }

    return {
      authUser,
      character,
      initMember,
      i18n,
      record,
      beforePage,
      isSubmit: isValidError,
      specialtiesTableColumns: makeSpecialtiesTableColumns(
        specialtiesTableColumns,
        character,
      ),
      specialtiesTableRows: specialtiesTableRows(
        bodyParts,
        specialties,
        character,
      ),
      canEdit: authUser && authUser.uid === record.uid,
      checkSpecialty,
      checkColumns: [
        {
          title: t('lostrpg_common_got_specialities'),
          field: 'name',
        },
        {
          title: t('lostrpg_common_check_number'),
          field: 'point',
        },
      ],
      checkSpecialties: character.specialties.map((s) => {
        if (!checkSpecialty) return { name: s, point: '' }
        const rowNumber = 11
        const target = specialties.indexOf(checkSpecialty)
        const t_x = _.floor(target / rowNumber)
        const t_y = target % rowNumber
        const sp = specialties.indexOf(s)
        const s_x = _.floor(sp / rowNumber)
        const s_y = sp % rowNumber
        let point = Math.abs(t_x - s_x) * 2 + Math.abs(t_y - s_y)
        const gaps = ['A', 'B', 'C', 'D', 'E'] as const
        gaps.forEach((x, i) => {
          const position = i + 1
          if (
            ((t_x < position && position <= s_x) ||
              (s_x < position && position <= t_x)) &&
            character.gaps.includes(x)
          )
            point -= 1
        })

        return {
          name: s,
          point: `2d6>=${point + 5}（${t('lostrpg_common_check')}：${s}）`,
        }
      }),
      scenarioTitleHandler: (e) => dispatchSetRecord(e, 'scenarioTitle'),
      gmNameHanler: (e) => dispatchSetRecord(e, 'gmName'),
      trophyHanler: (e) => dispatchSetRecord(e, 'trophy'),
      expHelper: (e) =>
        dispatch(setRecord({ ...record, exp: Number(e.target.value) })),
      memoHanler: (v) => dispatch(setRecord({ ...record, memo: v })),
      addMemberHandler: (e) =>
        dispatch(
          setRecord({
            ...record,
            members: [
              ...record.members,
              {
                ...initMember,
                id: _.uniqueId(initMember.id),
              },
            ],
          }),
        ),
      partyMemberNameHandler: (e, member) =>
        dispatchSetPartyMember(e, member, 'name'),
      partyMemberMemoHandler: (v, member) =>
        dispatch(setPartyMember({ ...member, memo: v })),
      partyMemberTrophyHandler: (e, member) =>
        dispatchSetPartyMember(e, member, 'trophy'),
      deleteMemberHandler: (member) => {
        if (!confirm(t('message_are_you_sure_remove'))) return
        dispatch(
          setRecord({
            ...record,
            members: record.members.filter((m) => m.id !== member.id),
          }),
        )
      },
      damageHandler: (name) => dispatch(toggleCharacterDamage(name)),
      checkHandler: (name) => setCheckSpecialty(name),
      gapHandler: (name) => name,
      expHelperHandler: (rowData) =>
        dispatch(
          setRecord({
            ...record,
            expChecks: rowData['isChecked']
              ? record.expChecks.filter((name) => name !== rowData['name'])
              : [...record.expChecks, rowData['name']],
          }),
        ),
      expChecks: makeExpChecks(record, expCheckPoints),
      editHandler: async () => {
        if (!record.scenarioTitle) {
          setIsValidError(true)
          window.scrollTo(0, 0)
          return
        }
        // 複数送信防止
        if (isSubmit) return
        setIsSubmit(true)
        const r = {
          ...record,
          damagedSpecialties: character.damagedSpecialties,
          characterId,
        }
        let retId = record.id
        if (!retId) {
          retId = await createRecord({ ...r, uid: authUser.uid }, authUser)
        } else {
          await updateRecord(retId, { ...r, uid: authUser.uid }, authUser.uid)
        }

        Router.push(
          {
            pathname: `/lostrpg/public/[lng]/[view]`,
            query: { id: retId },
          },
          `/lostrpg/public/${i18n.activeLocale}/record?id=${retId}`,
        )
      },
      deleteHandler: async () => {
        if (confirm(t('message_are_you_sure_remove'))) {
          await deleteRecord(record.id, authUser.uid)
          Router.push(beforePage)
          Router.push(
            {
              pathname: `/lostrpg/public/[lng]/[view]`,
              query: { id: characterId },
            },
            `/lostrpg/public/${i18n.activeLocale}/character?id=${characterId}`,
          )
        }
      },
    }
  })
