import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import useI18n from '~/hooks/use-i18n'
import type { LostModule } from './index'

export interface Record {
  sessionName: string
  gmName: string
  stamina: number
  willPower: number
  damagedSpecialties: string[]
  freeWriting?: string
  characterId: string
  uid?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}

const initRecord: Record = {
  sessionName: '',
  gmName: '',
  stamina: 0,
  willPower: 0,
  damagedSpecialties: [],
  freeWriting: '',
  characterId: '',
}

export const useRecordViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    const { character } = state.lost
    return {
      character,
    }
  })
