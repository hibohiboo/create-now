import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import * as store from '~/firestore/memoList'
import { AppThunk } from '~/store/rootState'

export interface MemoListItem {
  name: string
  tags: string[]
  memo: string
  point: number
  uid: string
  id: string
  nickname?: string
  url?: string
}
type CollectionName = 'systems'
interface MemoListState {
  current: CollectionName
  currentList: MemoListItem[]
  counts: { [k in CollectionName]: number }
  list: { [k in CollectionName]: MemoListItem[] }
}
export const init: MemoListState = {
  current: 'systems',
  currentList: [],
  counts: {
    systems: 0,
  },
  list: {
    systems: [],
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
      state.list[action.payload.current] = action.payload.list
    },
    setCounts: (
      state,
      action: PayloadAction<{ [k in CollectionName]: number }>,
    ) => {
      state.counts = action.payload
    },
    addItem: (
      state,
      action: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
    ) => {
      state.currentList.push(action.payload.item)
      state.list[action.payload.current].push(action.payload.item)
    },
    setItem: (
      state,
      {
        payload: { current, item },
      }: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
    ) => {
      state.currentList[
        state.currentList.findIndex((i) => i.id === item.id)
      ] = item
      state.list[current][
        state.list[current].findIndex((i) => i.id === item.id)
      ] = item
    },
    deleteItem: (
      state,
      {
        payload: { current, item },
      }: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
    ) => {
      state.currentList = state.currentList.filter((i) => i.id !== item.id)
      state.list[current] = state.list[current].filter((i) => i.id !== item.id)
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

const separator = ' '

export const useViewModel = () => {
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => ({
      data: state.memoList.currentList.map((item) => ({
        ...item,
        tags: item.tags.join(separator),
      })),
      columns: [
        { title: '略称', field: 'nickname' },
        { title: '名前', field: 'name' },
        { title: '備考', field: 'memo' },
        { title: 'タグ', field: 'tags' },
        {
          title: '★',
          field: 'point',
          type: 'numeric',
          editable: 'never',
        } as const, // typeを指定するときはconst
      ],
      options,
    }),
  )
}

export default memoListModule

const {
  setList,
  setCounts,
  addItem,
  setItem,
  deleteItem,
} = memoListModule.actions

export const readMemoList = (limit = 50, searchName = ''): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const list = await store.readMemoListCollection(current)
  console.log('list', list)
  dispatch(setList({ current, list }))
}

export const readCounts = (): AppThunk => async (dispatch) => {
  const data = await store.readMemoList()
  // console.log('data', data)

  dispatch(setCounts(data as any))
}

interface TableRow {
  name?: string
  tags?: string
  memo?: string
  point?: number
  nickname?: string
  url?: string
  id?: string
  uid?: string
}

const createMemoListItem = (data: TableRow): MemoListItem => ({
  id: data.id || '',
  uid: data.uid || '',
  name: data.name || 'ななし',
  tags: (data.tags && data.tags.split(separator)) || [],
  memo: data.memo || '',
  point: data.point || 0,
  nickname: data.nickname || '',
  url: data.url || '',
})

export const addMemoItem = (data: TableRow, uid: string): AppThunk => async (
  dispatch,
) => {
  console.log('data', data)
  const current = 'systems'
  const item = createMemoListItem(data)
  const id = await store.createMemo(current, item, uid)
  dispatch(addItem({ current, item: { ...item, uid, id } }))
}

export const updateMemoItem = (data: TableRow): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const item = createMemoListItem(data)
  await store.updateMemo(current, item)
  dispatch(setItem({ current, item }))
}

export const deleteMemoItem = (data: TableRow): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const item = createMemoListItem(data)
  await store.deleteMemo(current, item)
  dispatch(deleteItem({ current, item }))
}
