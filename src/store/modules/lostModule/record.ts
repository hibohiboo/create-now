import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'
import { readCharacters, readCampsCharacters } from '~/firestore/character'
import useI18n from '~/hooks/use-i18n'
import lostModule from './index'

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
  useSelector((state: { lost: ReturnType<typeof lostModule.reducer> }) => {
    const { character } = state.lost
    return {
      character,
    }
  })
