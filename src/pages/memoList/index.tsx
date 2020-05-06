/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React, { forwardRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
import AddBox from '@material-ui/icons/AddBox'
import ArrowDownward from '@material-ui/icons/ArrowDownward'
import Check from '@material-ui/icons/Check'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import Clear from '@material-ui/icons/Clear'
import DeleteOutline from '@material-ui/icons/DeleteOutline'
import Edit from '@material-ui/icons/Edit'
import FilterList from '@material-ui/icons/FilterList'
import FirstPage from '@material-ui/icons/FirstPage'
import LastPage from '@material-ui/icons/LastPage'
import Remove from '@material-ui/icons/Remove'
import SaveAlt from '@material-ui/icons/SaveAlt'
import Search from '@material-ui/icons/Search'
import ViewColumn from '@material-ui/icons/ViewColumn'
import MaterialTable from 'material-table'

import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import { useList } from '~/store/modules/memoListModule'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import Link from '~/components/atoms/mui/Link'

const tableIcons: {
  [key: string]: React.ForwardRefExoticComponent<
    React.RefAttributes<SVGSVGElement>
  >
} = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
}

const Page: NextPage = () => {
  const dispatch = useDispatch()
  const authUser = useAuth()
  const items = useList()

  useEffect(() => {
    dispatch(createAuthClientSide())
  }, [])

  return (
    <Container>
      <Head>
        <title>TRPG関連メモ</title>
      </Head>
      <MaterialTable
        title={'システム'}
        icons={tableIcons}
        columns={[{ title: 'name', field: 'name' }]}
        data={(query) =>
          new Promise((resolve, reject) => {
            let url = 'https://reqres.in/api/users?'
            url += 'per_page=' + query.pageSize
            url += '&page=' + (query.page + 1)
            console.log('query', query)
            console.log('item', items)
            resolve({ data: items, page: 0, totalCount: 0 })
          })
        }
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}

export default Page