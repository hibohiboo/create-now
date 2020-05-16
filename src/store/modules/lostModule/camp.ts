import { useSelector } from 'react-redux'
import { AppThunk } from '~/store/rootState'
import { readCamps } from '~/firestore/camp'
import useI18n from '~/hooks/use-i18n'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'
import { defaultLanguage } from '~/lib/i18n'
import type { Item } from './character'
import type { LostModule } from './index'
import {
  setPagenationLoading,
  paginationLoaded,
  setError,
  setCamps,
  addCamps,
} from './index'

export interface Facility {
  name: string
  type: string
  specialty: string
  level: number
  effect: string
}

export interface Camp {
  name: string
  id?: string
  facilities?: Facility[]
  freeWriting?: string
  playerName?: string
  uid?: string
  imageUrl?: string
  twitterId?: string
  createdAt?: any
  updatedAt?: any
  summary?: string
  items: Item[]
  unusedCampPoint: number
  totalCampPoint: number
}

export const initCamp = {
  name: '',
  facilities: [],
  freeWriting: '',
  playerName: '',
  createdAt: '',
  updatedAt: '',
  twitterId: '',
  uid: '',
  summary: '',
  items: [],
  unusedCampPoint: 0,
  totalCampPoint: 0,
}

// state
export const useCamps = () =>
  useSelector((state: { lost: LostModule }) => state.lost.camps)

// ViewModel
export const useCampViewModel = () =>
  useSelector((state: { lost: LostModule }) => {
    const i18n = useI18n()
    const { itemsColumns, items } =
      i18n.activeLocale === defaultLanguage ? lostData : lostDataEn

    return {
      itemsColumns,
      items,
    }
  })

// thunk
interface CampLoaded {
  camps: Camp[]
  next: string
  hasMore: boolean
}
const fetchCampsCommon = async (next, limit, dispatch, action, searchName) => {
  dispatch(setPagenationLoading(true))
  try {
    const ret: CampLoaded = await readCamps(next, limit, searchName)
    dispatch(paginationLoaded(ret))
    dispatch(action(ret.camps))
  } catch (err) {
    dispatch(setError(err.toString()))
    dispatch(setPagenationLoading(false))
  }
}
export const fetchCamps = (limit: number, searchName = ''): AppThunk => async (
  dispatch,
) => {
  await fetchCampsCommon(null, limit, dispatch, setCamps, searchName)
}

export const fetchCampsMore = (
  next: string,
  limit: number,
  searchName: string,
): AppThunk => async (dispatch) => {
  await fetchCampsCommon(next, limit, dispatch, addCamps, searchName)
}
