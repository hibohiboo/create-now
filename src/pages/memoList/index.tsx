/* eslint-disable react/display-name */
import * as _ from 'lodash'
import React from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { Box, Button, Switch, FormControlLabel, Chip } from '@material-ui/core'
import { Search } from '@material-ui/icons'
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
    ...vm.columns.slice(0, 3),
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
    ...vm.columns.slice(4),
  ]
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
        title={'システム'}
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
