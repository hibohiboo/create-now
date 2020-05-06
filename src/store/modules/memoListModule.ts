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
type CollectionName = 'systems'
interface MemoListState {
  current: CollectionName
  currentList: MemoListItem[]
  counts: { [k in CollectionName]: number }
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
  counts: {
    systems: 0,
  },
}

// actions と reducers の定義
const memoListModule = createSlice({
  name: 'memoList',
  initialState: init,
  reducers: {
    setList: (
      state,
      action: PayloadAction<{ current: CollectionName; list: MemoListItem[] }>,
    ) => {
      state.currentList = action.payload.list
      state.current = action.payload.current
    },
    setCounts: (
      state,
      action: PayloadAction<{ [k in CollectionName]: number }>,
    ) => {
      state.counts = action.payload
    },
  },
})

const options = {
  sorting: false,
  paging: false,
  rowStyle: {
    whiteSpace: 'nowrap',
  },
  headerStyle: {
    whiteSpace: 'nowrap',
  },
} as const

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
      options,
    }),
  )
}

export default memoListModule

const { setList, setCounts } = memoListModule.actions

export const readSystems = (limit = 50, searchName = ''): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const list = await readMemoListCollection(current)
  console.log('list', list)
  dispatch(setList({ current, list }))
}
export const readCounts = (): AppThunk => async (dispatch) => {
  const data = await readMemoList()
  // console.log('data', data)

  dispatch(setCounts(data as any))
}
