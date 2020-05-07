/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import MaterialTable from 'material-table'
import { resetServerContext } from 'react-beautiful-dnd' // material-table の内部のdraggableで使用している模様

import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  useViewModel,
  readMemoList,
  readCounts,
  addMemoItem,
  updateMemoItem,
  deleteMemoItem,
} from '~/store/modules/memoListModule'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import Link from '~/components/atoms/mui/Link'
import TableIcons from '~/components/molcures/TableIcons'
// next.jsのSSR時にリセットしないとエラー
resetServerContext()

const Page: NextPage = () => {
  const dispatch = useDispatch()
  const authUser = useAuth()
  const vm = useViewModel()

  useEffect(() => {
    dispatch(createAuthClientSide())
    dispatch(readMemoList())
    dispatch(readCounts())
  }, [])

  return (
    <Container>
      <Head>
        <title>TRPG関連メモ</title>
      </Head>
      <MaterialTable
        title={'システム'}
        icons={TableIcons}
        options={vm.options}
        columns={vm.columns}
        data={vm.data}
        onQueryChange={(query) => {
          console.log('query', query)
          dispatch(readMemoList(query.pageSize))
        }}
        editable={{
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
        }}
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}

export default Page
