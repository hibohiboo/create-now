import { useSelector } from 'react-redux'
import type { LostModule } from './index'

export type PaginationState = {
  hasMore: boolean
  lastLoaded: string | null
  limit: number
  loading: boolean
}
export const initialState = {
  hasMore: false,
  limit: 20,
  lastLoaded: null,
  loading: true,
}

// state
export const useListPagination = () =>
  useSelector((state: { lost: LostModule }) => state.lost.listPagination)
