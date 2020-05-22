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
  setBoss,
  setLocale,
} from './index'
import { isBodyParts } from './character'
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
export const useBossViewModel = (recordId?: string, cid?: string) =>
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
    const dispatchSetBoss = (e, prop: string) => {
      const r = { ...boss }
      r[prop] = e.target.value
      dispatch(setBoss(r))
    }
    return { i18n, authUser, boss, dispatchSetBoss }
  })
