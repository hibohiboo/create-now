import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import useI18n from '~/hooks/use-i18n'
import type { LostModule } from './index'

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
  freeWriting?: string
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
  freeWriting: '',
  characterId: '',
}
// state of
export const useRecord = () =>
  useSelector((state: { lost: LostModule }) => state.lost.record)

// View Model
export const useRecordViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    const { character } = state.lost
    return {
      character,
      initMember,
    }
  })
