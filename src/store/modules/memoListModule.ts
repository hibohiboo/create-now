import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { readMemoListCollection, readMemoList } from '~/firestore/memoList'
import { AppThunk } from '~/store/rootState'

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
    {
      name: 'クトゥルフ',
      tags: ['ホラー'],
      memo: '',
      point: 0,
      uid: '',
      nickname: '',
    },
  ],
}

// actions と reducers の定義
const memoListModule = createSlice({
  name: 'memoList',
  initialState: init,
  reducers: {
    setList: (
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
      columns: [
        { title: '略称', field: 'nickname' },
        { title: '名前', field: 'name' },
        { title: '備考', field: 'memo' },
        { title: 'タグ', field: 'tags' },
        { title: '★', field: 'point', type: 'numeric' } as const, // typeを指定するときはconst
      ],
    }),
  )
}

export default memoListModule

const { setList } = memoListModule.actions

export const readSystems = (limit = 10, searchName = ''): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const list = await readMemoListCollection(current)
  const data = await readMemoList()
  console.log('list', list)
  console.log('data', data)
  dispatch(setList({ current, list }))
}
