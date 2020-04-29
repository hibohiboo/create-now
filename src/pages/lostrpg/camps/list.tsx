import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { makeStyles } from '@material-ui/core/styles'
import { Box, Button } from '@material-ui/core'
import List from '@material-ui/core/List'
import ListItemText from '@material-ui/core/ListItemText'
import ListSubheader from '@material-ui/core/ListSubheader'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'
import SearchIcon from '@material-ui/icons/Search'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  useCamps,
  useCampsPagination,
  fetchCamps,
  fetchCampsMore,
} from '~/store/modules/lostModule'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}))

const Page: NextPage = () => {
  const classes = useStyles()
  const authUser = useAuth()
  const items = useCamps()
  const [search, setSearch] = useState({ name: '' })
  const pagenation = useCampsPagination()
  const dispatch = useDispatch()
  const loadMore = () =>
    dispatch(
      fetchCampsMore(pagenation.lastLoaded, pagenation.limit, search.name),
    )
  const filteredCamps = () =>
    dispatch(fetchCamps(pagenation.limit, search.name))

  useEffect(() => {
    dispatch(fetchCamps(pagenation.limit))
    dispatch(createAuthClientSide())
  }, [])

  return (
    <Container>
      <Box my={4}>
        <h2>LOSTRPG キャンプ一覧</h2>
        {authUser ? <Link href="/lostrpg/camps/edit">新規作成</Link> : <></>}
        <Box display="flex" style={{ maxWidth: '200px', minWidth: '50px' }}>
          <InputField
            model={search}
            type="text"
            prop="name"
            labelText="キャンプ名"
            changeHandler={(e) =>
              setSearch({ ...search, name: e.target.value })
            }
          />
          <Button variant="contained" color="primary" onClick={filteredCamps}>
            <SearchIcon />
          </Button>
        </Box>

        <div>
          {pagenation.loading && <div>...</div>}
          {!pagenation.loading && (
            <List
              component="ul"
              aria-labelledby="nested-list-subheader"
              subheader={
                <ListSubheader component="div" id="nested-list-subheader">
                  キャンプ一覧
                </ListSubheader>
              }
              className={classes.root}
            ></List>
          )}
          {items.map((item) => (
            <ListItemLink
              href={{
                pathname: '/lostrpg/camps/view', // trailing slash(/lostrpg/camps/edit/)にするとエラー。
                query: { id: item.id },
              }}
              key={item.id}
            >
              <ListItemText primary={item.name} />
            </ListItemLink>
          ))}
          {pagenation.hasMore && !pagenation.loading && !search.name && (
            <Button onClick={loadMore}>次の{pagenation.limit}件</Button>
          )}
        </div>
      </Box>
      <Link href="/lostrpg">戻る</Link>
    </Container>
  )
}

export default Page
