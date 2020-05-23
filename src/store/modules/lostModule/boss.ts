import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Router, { useRouter } from 'next/router'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import { readCharacters, readCampsCharacters } from '~/firestore/character'
import { readCharactersRecords } from '~/firestore/record'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { defaultLanguage } from '~/lib/i18n'
import type { Ability } from './character'
import type { LostModule } from './index'
import {
  setPagenationLoading,
  paginationLoaded,
  setError,
  setCharacters,
  addCharacters,
  setCampsCharacters,
  setCharactersRecords,
  toggleBossDamage,
  setBoss,
  setLocale,
} from './index'
import {
  isBodyParts,
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
  stamina: 10,
  willPower: 10,
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
export const useBoss = () =>
  useSelector((state: { lost: LostModule }) => state.lost.boss)
export const useBosses = () =>
  useSelector((state: { lost: LostModule }) => state.lost.bosses)
// ViewModel
export const useBossViewModel = (bossId?: string) =>
  useSelector((state: { lost: LostModule }) => {
    // Validation State
    const [isValidError, setIsValidError] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const authUser = useAuth()
    const i18n = useI18n()
    const t = i18n.t
    const router = useRouter()
    const dispatch = useDispatch()
    const boss = useBoss()
    const beforePage = `/lostrpg`
    const { specialties, bodyParts, specialtiesTableColumns, expCheckPoints } =
      i18n.activeLocale === defaultLanguage ? lostData : lostDataEn
    const id = bossId || (router.query.id as string)

    useEffect(() => {
      dispatch(createAuthClientSide())
      dispatch(setLocale(i18n.activeLocale))
    }, [])
    useEffect(() => {
      if (!bossId && authUser) {
        dispatch(
          setBoss({ ...boss, creatorName: authUser.displayName, specialties }),
        )
      }
    }, [authUser])
    const dispatchSetBoss = (e, prop: string) => {
      const r = { ...boss }
      r[prop] = e.target.value
      dispatch(setBoss(r))
    }
    return {
      i18n,
      authUser,
      boss,
      isSubmit,
      specialtiesTableColumns: makeSpecialtiesTableColumns(
        specialtiesTableColumns,
        boss,
      ),
      specialtiesTableRows: specialtiesTableRows(bodyParts, specialties, boss),
      creatorNameHandler: (e) => dispatchSetBoss(e, 'creatorName'),
      bossNameHandler: (e) => dispatchSetBoss(e, 'name'),
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
    }
  })
