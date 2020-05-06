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
  readSystems,
  readCounts,
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
    dispatch(readSystems())
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
          dispatch(readSystems(query.pageSize))
        }}
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}

export default Page
