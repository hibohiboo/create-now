import React, { useEffect } from 'react'
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
import { useAuth } from '~/store/modules/authModule'
import {
  useCamps,
  useCampsPagination,
  fetchCamps,
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
  const loadMore = () => ({})
  const items = useCamps()
  const { loading, hasMore } = useCampsPagination()
  const loadingMore = false
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCamps())
  }, [dispatch])
  return (
    <Container>
      <Box my={4}>
        <h2>LOSTRPG キャンプ一覧</h2>
        {authUser ? <Link href="/lostrpg/camps/edit">新規作成</Link> : <></>}
        <div>
          {loading && <div>...</div>}
          {!loading && (
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
          {hasMore && !loadingMore && (
            <Button onClick={loadMore}>次の10件</Button>
          )}
        </div>
      </Box>
      <Link href="/lostrpg">戻る</Link>
    </Container>
  )
}

export default Page
