import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as store from '~/firestore/memoList'
import { AppThunk } from '~/store/rootState'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import { resetServerContext } from 'react-beautiful-dnd' // material-table の内部のdraggableで使用している模様

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
  counts: { [k in CollectionName]: number }
  list: { [k in CollectionName]: MemoListItem[] }
  searchTags: string
}
export const init: MemoListState = {
  current: 'systems',
  counts: {
    systems: 0,
  },
  list: {
    systems: [],
  },
  searchTags: '',
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
      state.list[action.payload.current].push(action.payload.item)
    },
    setItem: (
      state,
      {
        payload: { current, item },
      }: PayloadAction<{ current: CollectionName; item: MemoListItem }>,
    ) => {
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
      state.list[current] = state.list[current].filter((i) => i.id !== item.id)
    },
    setSearchTags: (state, action: PayloadAction<string>) => {
      state.searchTags = action.payload
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

export default memoListModule

const {
  setList,
  setCounts,
  addItem,
  setItem,
  setSearchTags,
  deleteItem,
} = memoListModule.actions

export const readMemoList = (
  limit = 50,
  searchTags: string[] = [],
): AppThunk => async (dispatch) => {
  const current = 'systems'
  const list = await store.readMemoListCollection(current, limit, searchTags)
  console.log('list', list)
  dispatch(setList({ current, list }))
}

export const readCounts = (): AppThunk => async (dispatch) => {
  const data = await store.readMemoList()

  dispatch(setCounts(data as any))
}

type TableRow = Omit<Partial<MemoListItem>, 'tags'> & { tags?: string }
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

export const useViewModel = () => {
  const dispatch = useDispatch()
  const authUser = useAuth()
  const editHandler = !authUser
    ? undefined
    : {
        onRowAdd: async (newData) => {
          dispatch(addMemoItem(newData, authUser.uid))
        },
        onRowUpdate: async (newData, oldData) => {
          dispatch(updateMemoItem(newData))
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            }, 300)
          })
        },
        onRowDelete: (oldData) => {
          dispatch(deleteMemoItem(oldData))
          return new Promise((resolve) => {
            setTimeout(() => {
              resolve()
            }, 300)
          })
        },
      }
  const searchLimit = 50
  // next.jsのSSR時にリセットしないとエラー
  resetServerContext()

  // 初期読込
  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(readMemoList())
    dispatch(readCounts())
  }, [])
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => ({
      data: state.memoList.list[state.memoList.current].map((item) => ({
        ...item,
        // 配列でTableRowに渡そうとするとエラー
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
      editHandler,
      searchHandler: () => {
        dispatch(
          readMemoList(searchLimit, state.memoList.searchTags.split(separator)),
        )
      },
      searchTagsChangeHandler: (e) => dispatch(setSearchTags(e.target.value)),
    }),
  )
}
