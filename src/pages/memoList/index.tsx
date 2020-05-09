/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Button,
  Switch,
  FormControlLabel,
  Chip,
  Paper,
  Tabs,
  Tab,
} from '@material-ui/core'
import { Search, StarBorder } from '@material-ui/icons'
import MaterialTable from 'material-table'

import { useViewModel, separator } from '~/store/modules/memoListModule'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import Link from '~/components/atoms/mui/Link'
import TableIcons from '~/components/molcures/TableIcons'
import InputField from '~/components/form/InputField'
import sanitize from 'sanitize-html'

const Page: NextPage = () => {
  const vm = useViewModel()
  const columns = [
    {
      title: '★',
      field: 'point',
      type: 'numeric',
      editable: 'never',
      cellStyle: { textAlign: 'right' },
      render: (rowData) =>
        !vm.auth
          ? (rowData && rowData.point) || 0
          : (rowData && (
              <Button
                endIcon={<StarBorder />}
                onClick={() => vm.pointClickHandler(rowData)}
                color="secondary"
                style={{ width: '80px', justifyContent: 'flex-end' }}
              >
                {rowData.point}
              </Button>
            )) ||
            0,
    } as const, // typeを指定するときはconst
    { title: '略称', field: 'nickname' },
    { title: '名前', field: 'name' },
    {
      title: 'タグ',
      field: 'tags',
      render: (rowData) =>
        rowData.tags
          .split(separator)
          .map((tag, i) => (
            <Chip
              key={i}
              label={tag}
              onClick={() => vm.tagClickHandler(tag)}
              variant="outlined"
              style={{ marginRight: '0.5rem' }}
            />
          )),
    },
    {
      title: 'リンク',
      field: 'url',
      render: (rowData) =>
        rowData.url ? (
          <div
            style={{
              maxWidth: '100px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}
            dangerouslySetInnerHTML={{
              __html: sanitize(
                `<a href="${rowData.url}">${rowData.url
                  .replace('https://', '')
                  .replace('http://', '')}</a>`,
                {
                  allowedTags: ['a'],
                  allowedAttributes: {
                    a: ['href'],
                  },
                  allowedSchemes: ['http', 'https'],
                },
              ),
            }}
          ></div>
        ) : (
          <></>
        ),
    },
    { title: '備考', field: 'memo' },
  ]
  const [value, setValue] = React.useState(0)

  return (
    <Container>
      <Head>
        <title>TRPG関連メモ</title>
      </Head>
      <Paper>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={(e, v) => {
            setValue(v)
            console.log('test1')
          }}
          variant="scrollable"
          scrollButtons="on"
        >
          {_.map(vm.genres, (value, key) => (
            <Tab
              key={key}
              label={value}
              onClick={() => vm.genreChangeHandler(key)}
            />
          ))}
        </Tabs>
      </Paper>
      <Box my={2}>
        <InputField
          model={vm}
          type="string"
          prop="searchTags"
          labelText={'タグ'}
          changeHandler={vm.searchTagsChangeHandler}
        />
        <span style={{ margin: '20px' }}>★順</span>
        <FormControlLabel
          control={
            <Switch
              checked={vm.isSortCreated}
              onChange={vm.toggleIsSortCreated}
              name="isSortCreated"
              inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
          }
          label="新着順"
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
        title={vm.currentName}
        icons={TableIcons}
        options={vm.options}
        columns={columns}
        data={vm.data}
        editable={vm.editHandler}
        localization={vm.localization}
      />
      <Link href="/">戻る</Link>
    </Container>
  )
}

export default Page
