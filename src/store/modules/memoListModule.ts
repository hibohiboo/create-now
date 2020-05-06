import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'

export interface MemoListItem {
  name: string
  tags: string[]
  memo: string
  point: number
  uid: string
  nickname?: string
  url?: string
}
type collectionName = 'systems'
interface MemoListState {
  current: collectionName
  currentList: MemoListItem[]
}
export const init: MemoListState = {
  current: 'systems',
  currentList: [
    { name: 'クトゥルフ', tags: ['ホラー'], memo: '', point: 0, uid: '' },
  ],
}

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

export const useViewModel = () => {
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => ({
      data: state.memoList.currentList.map((item) => ({
        ...item,
        tags: item.tags.join(','),
      })),
    }),
  )
}

export default memoListModule
