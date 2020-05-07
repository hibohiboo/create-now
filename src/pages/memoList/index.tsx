/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button } from '@material-ui/core'
import { Search } from '@material-ui/icons'
import MaterialTable from 'material-table'

import { useViewModel, readMemoList } from '~/store/modules/memoListModule'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import Link from '~/components/atoms/mui/Link'
import TableIcons from '~/components/molcures/TableIcons'
import InputField from '~/components/form/InputField'

const Page: NextPage = () => {
  const dispatch = useDispatch()
  const vm = useViewModel()

  return (
    <Container>
      <Head>
        <title>TRPG関連メモ</title>
      </Head>
      <Box my={2}>
        <InputField
          model={vm}
          type="string"
          prop="searchTags"
          labelText={'タグ'}
          changeHandler={vm.searchTagsChangeHandler}
        />
        <Button
          startIcon={<Search />}
          onClick={vm.searchHandler}
          variant="contained"
          color="secondary"
        >
          検索
        </Button>
      </Box>

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
        editable={vm.editHandler}
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}

export default Page
