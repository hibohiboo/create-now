import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'
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
  useListPagination,
  fetchCamps,
  fetchCampsMore,
} from '~/store/modules/lostModule'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

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
  const i18n = useI18n()
  const t = i18n.t
  const classes = useStyles()
  const authUser = useAuth()
  const items = useCamps()
  const [search, setSearch] = useState({ name: '' })
  const pagenation = useListPagination()
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
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale]}
        />
      </Head>
      <Box my={4}>
        <h2>{t('lostrpg_camps_list_title')}</h2>
        <div style={{ display: 'none' }}>
          <LanguageSelector i18n={i18n} />
        </div>
        <Box mt={2}>
          {authUser ? (
            <Link href="/lostrpg/camps/edit">{t('common_create')}</Link>
          ) : (
            <Link href="/auth/login">
              {t('lostrpg_camps_list_please_login')}
            </Link>
          )}
        </Box>
        <Box display="flex" style={{ maxWidth: '200px', minWidth: '50px' }}>
          <InputField
            model={search}
            type="text"
            prop="name"
            labelText={t('lostrpg_camps_list_campName')}
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
                  {i18n.t('lostrpg_camps_list_campList')}
                </ListSubheader>
              }
              className={classes.root}
            ></List>
          )}
          {items.map((item) => (
            <ListItemLink
              href={{
                pathname: '/lostrpg/public/[lng]/[view]',
                query: { id: item.id },
              }}
              key={item.id}
              as={`/lostrpg/public/${i18n.activeLocale}/camp?id=${item.id}`}
            >
              <ListItemText primary={item.name} />
            </ListItemLink>
          ))}
          {pagenation.hasMore && !pagenation.loading && !search.name && (
            <Button onClick={loadMore}>次の{pagenation.limit}件</Button>
          )}
        </div>
      </Box>
      <Link href="/lostrpg">{t('common_back')}</Link>
    </Container>
  )
}

export default Page
