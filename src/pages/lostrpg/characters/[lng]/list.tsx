import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import {
  Box,
  Button,
  List,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { SearchIcon } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import { languages, contentLanguageMap } from '~/lib/i18n'
import useI18n from '~/hooks/use-i18n'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'

import { useAuth, createAuthClientSide } from '~/store/modules/authModule'
import {
  useCharacters,
  fetchCharacters,
  fetchCharactersMore,
  useListPagination,
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

const HomePage = () => {
  const classes = useStyles()
  const i18n = useI18n()
  const t = i18n.t
  const authUser = useAuth()
  const items = useCharacters()
  const [search, setSearch] = useState({ name: '' })
  const pagenation = useListPagination()
  const dispatch = useDispatch()

  // ページアクセス時に初回表示用のデータを取得
  useEffect(() => {
    dispatch(fetchCharacters(pagenation.limit))
    dispatch(createAuthClientSide())
  }, [])

  const loadMore = () =>
    dispatch(
      fetchCharactersMore(pagenation.lastLoaded, pagenation.limit, search.name),
    )
  const filtered = () =>
    dispatch(fetchCharacters(pagenation.limit, search.name))
  return (
    <Container>
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale]}
        />
      </Head>
      <h2>{t('lostrpg_character_list_title')}</h2>
      <Box mt={2}>
        {authUser ? (
          <Link
            href={`/lostrpg/characters/[lng]/edit`}
            as={`/lostrpg/characters/${i18n.activeLocale}/edit`}
          >
            {i18n.t('common_create')}
          </Link>
        ) : (
          <></>
        )}
      </Box>

      <Box display="flex" style={{ maxWidth: '200px', minWidth: '50px' }}>
        <InputField
          model={search}
          type="text"
          prop="name"
          labelText={i18n.t('common_name')}
          changeHandler={(e) => setSearch({ ...search, name: e.target.value })}
        />
        <Button variant="contained" color="primary" onClick={filtered}>
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
                {i18n.t('lostrpg_character_common_characterList')}
              </ListSubheader>
            }
            className={classes.root}
          ></List>
        )}
        {items.map((item) => (
          <ListItemLink href="" key={item.id}>
            <ListItemText primary={item.name} />
          </ListItemLink>
        ))}
        {pagenation.hasMore && !pagenation.loading && !search.name && (
          <Button onClick={loadMore}>次の{pagenation.limit}件</Button>
        )}
      </div>
      <Link href="/lostrpg">{t('common_back')}</Link>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const { default: lngDict = {} } = await import(`~/locales/${params.lng}.json`)

  return {
    props: { lng: params.lng, lngDict },
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default HomePage
