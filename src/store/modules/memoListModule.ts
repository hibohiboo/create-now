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
  createdAt?: any
}
const genres = { systems: 'システム' } as const
type CollectionName = keyof typeof genres
interface MemoListState {
  current: CollectionName
  counts: { [k in CollectionName]: number }
  list: { [k in CollectionName]: MemoListItem[] }
  searchTags: string
  isSortCreated: boolean
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
  isSortCreated: false,
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
    setIsSortCreated: (state, action: PayloadAction<boolean>) => {
      state.isSortCreated = action.payload
    },
  },
})

export const separator = ' '

export default memoListModule

const {
  setList,
  setCounts,
  addItem,
  setItem,
  setSearchTags,
  deleteItem,
  setIsSortCreated,
} = memoListModule.actions

export const readMemoList = (
  limit = 50,
  searchTags: string[] = [],
  isSortCreated = false,
): AppThunk => async (dispatch) => {
  const current = 'systems'
  const list = await store.readMemoListCollection(
    current,
    limit,
    searchTags.filter(Boolean), // 空文字、0などを除去
    isSortCreated,
  )

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
  tags: (data.tags && data.tags.trim().split(separator)) || [],
  memo: data.memo || '',
  point: data.point || 0,
  nickname: data.nickname || '',
  url: data.url || '',
  createdAt: data.createdAt || '',
})

const addMemoItem = (data: TableRow, uid: string): AppThunk => async (
  dispatch,
) => {
  const current = 'systems'
  const item = createMemoListItem(data)
  const newItem = await store.createMemo(current, item, uid)
  dispatch(
    addItem({
      current,
      item: { ...item, ...newItem },
    }),
  )
}

const updateMemoItem = (data: TableRow): AppThunk => async (dispatch) => {
  const current = 'systems'
  const item = createMemoListItem(data)
  await store.updateMemo(current, item)
  dispatch(setItem({ current, item }))
}

const deleteMemoItem = (data: TableRow): AppThunk => async (dispatch) => {
  const current = 'systems'
  const item = createMemoListItem(data)
  await store.deleteMemo(current, item)
  dispatch(deleteItem({ current, item }))
}

const options = {
  sorting: false,
  paging: false,
  rowStyle: {
    whiteSpace: 'nowrap',
  },
  headerStyle: {
    whiteSpace: 'nowrap',
  },
  actionsColumnIndex: 6,
  addRowPosition: 'first',
} as const
const searchLimit = 50
export const useViewModel = () => {
  const dispatch = useDispatch()
  const authUser = useAuth()
  const editHandler = !authUser
    ? undefined
    : {
        isDeletable: (rowData) => rowData.uid === authUser.uid,
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

  // next.jsのSSR時にリセットしないとエラー
  resetServerContext()

  // 初期読込
  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(readMemoList())
    dispatch(readCounts())
  }, [])
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => {
      return {
        data: state.memoList.list[state.memoList.current].map((item) => ({
          ...item,
          // 配列でTableRowに渡そうとするとエラー
          tags: item.tags.join(separator),
        })),
        options,
        editHandler,
        searchTags: state.memoList.searchTags,
        searchHandler: () => {
          dispatch(
            readMemoList(
              searchLimit,
              state.memoList.searchTags.trim().split(separator),
              state.memoList.isSortCreated,
            ),
          )
        },
        searchTagsChangeHandler: (e) => dispatch(setSearchTags(e.target.value)),
        toggleIsSortCreated: (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setIsSortCreated(event.target.checked))
        },
        isSortCreated: state.memoList.isSortCreated,
        tagClickHandler: async (tag: string) => {
          dispatch(setSearchTags(tag))
        },
        localization: {
          header: {
            actions: '',
          },
          body: {
            editRow: { deleteText: '削除しますか?' },
            addTooltip: '新しい行を追加',
            deleteTooltip: '削除',
            editTooltip: '削除',
          },
          toolbar: { searchPlaceholder: '検索結果の絞り込み' },
        },
        auth: authUser,
        pointClickHandler: async (memo: TableRow) => {
          dispatch(updateMemoItem({ ...memo, point: memo.point + 1 }))
        },
        currentName: genres[state.memoList.current],
      }
    },
  )
}
