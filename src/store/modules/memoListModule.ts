import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export interface MemoListItem {
  name: string
  tags: string[]
  memo: string
  point: number
  nickname?: string
  url?: string
}
type collectionName = 'systems'
interface MemoListState {
  current: collectionName
  currentList: MemoListItem[]
}
export const init: MemoListState = { current: 'systems', currentList: [] }

// actions と reducers の定義
const memoListModule = createSlice({
  name: 'memoList',
  initialState: init,
  reducers: {
    updateList: (
      state,
      action: PayloadAction<{ current: collectionName; list: MemoListItem[] }>,
    ) => {
      state.currentList = action.payload.list
      state.current = action.payload.current
    },
  },
})

export const useList = () => {
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) =>
      state.memoList.currentList,
  )
}

export default memoListModule
