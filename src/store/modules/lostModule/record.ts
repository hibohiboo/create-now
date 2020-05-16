import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import useI18n from '~/hooks/use-i18n'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import type { LostModule } from './index'
import { getCharacter } from '~/firestore/character'
import { getIdFromQuery } from '~/utils/urlHelper'
import { setCharacter, setLocale, setRecord, setPartyMember } from './index'

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
  characterId: string
  uid?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}

export const initRecord: Record = {
  scenarioTitle: '',
  gmName: '',
  stamina: 0,
  willPower: 0,
  damagedSpecialties: [],
  members: [],
  memo: '',
  characterId: '',
}
// state of
export const useRecord = () =>
  useSelector((state: { lost: LostModule }) => state.lost.record)

// View Model
export const useRecordViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    // Validation State
    const [isSubmit, setIsSubmit] = useState(false)
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const record = useRecord()

    const id = getIdFromQuery(router)
    const beforePage = `/lostrpg/public/${i18n.activeLocale}/character?id=${id}`
    const { character } = state.lost
    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])

    useEffect(() => {
      if (!id || !authUser) {
        return
      }
      ;(async () => {
        const data = await getCharacter(id)
        if (data) {
          dispatch(setCharacter(data))
        }
      })()
    }, [id, authUser])
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
      scenarioTitleHandler: (e) => dispatchSetRecord(e, 'scenarioTitle'),
      gmNameHanler: (e) => dispatchSetRecord(e, 'gmName'),
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
    }
  })
