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
const genres = { systems: 'システム', supplements: 'サプリメント' } as const
type CollectionName = keyof typeof genres
interface MemoListState {
  current: CollectionName
  list: { [k in CollectionName]: MemoListItem[] }
  searchTags: string
  isSortCreated: boolean
}
const defaultGenre = 'supplements'

export const init: MemoListState = {
  current: defaultGenre,
  list: {
    systems: [],
    supplements: [],
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
  addItem,
  setItem,
  setSearchTags,
  deleteItem,
  setIsSortCreated,
} = memoListModule.actions

export const readMemoList = (
  current: CollectionName,
  limit = 50,
  searchTags: string[] = [],
  isSortCreated = false,
): AppThunk => async (dispatch) => {
  const list = await store.readMemoListCollection(
    current,
    limit,
    searchTags.filter(Boolean), // 空文字、0などを除去
    isSortCreated,
  )

  dispatch(setList({ current, list }))
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

const addMemoItem = (
  current: CollectionName,
  data: TableRow,
  uid: string,
): AppThunk => async (dispatch) => {
  const item = createMemoListItem(data)
  const newItem = await store.createMemo(current, item, uid)
  dispatch(
    addItem({
      current,
      item: { ...item, ...newItem },
    }),
  )
}

const updateMemoItem = (
  current: CollectionName,
  data: TableRow,
): AppThunk => async (dispatch) => {
  const item = createMemoListItem(data)
  await store.updateMemo(current, item)
  dispatch(setItem({ current, item }))
}

const deleteMemoItem = (
  current: CollectionName,
  data: TableRow,
): AppThunk => async (dispatch) => {
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

  // next.jsのSSR時にリセットしないとエラー
  resetServerContext()

  // 初期読込
  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(readMemoList(defaultGenre))
  }, [])
  return useSelector(
    (state: { memoList: ReturnType<typeof memoListModule.reducer> }) => {
      const memoList = state.memoList
      const editHandler = !authUser
        ? undefined
        : {
            isDeletable: (rowData) => rowData.uid === authUser.uid,
            onRowAdd: async (newData) => {
              dispatch(addMemoItem(memoList.current, newData, authUser.uid))
            },
            onRowUpdate: async (newData, oldData) => {
              dispatch(updateMemoItem(memoList.current, newData))
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve()
                }, 300)
              })
            },
            onRowDelete: (oldData) => {
              dispatch(deleteMemoItem(memoList.current, oldData))
              return new Promise((resolve) => {
                setTimeout(() => {
                  resolve()
                }, 300)
              })
            },
          }

      return {
        data: memoList.list[memoList.current].map((item) => ({
          ...item,
          // 配列でTableRowに渡そうとするとエラー
          tags: item.tags.join(separator),
        })),
        options,
        editHandler,
        searchTags: memoList.searchTags,
        searchHandler: () => {
          dispatch(
            readMemoList(
              memoList.current,
              searchLimit,
              memoList.searchTags.trim().split(separator),
              memoList.isSortCreated,
            ),
          )
        },
        searchTagsChangeHandler: (e) => dispatch(setSearchTags(e.target.value)),
        toggleIsSortCreated: (event: React.ChangeEvent<HTMLInputElement>) => {
          dispatch(setIsSortCreated(event.target.checked))
        },
        isSortCreated: memoList.isSortCreated,
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
          dispatch(
            updateMemoItem(memoList.current, {
              ...memo,
              point: memo.point + 1,
            }),
          )
        },
        currentName: genres[memoList.current],
      }
    },
  )
}
