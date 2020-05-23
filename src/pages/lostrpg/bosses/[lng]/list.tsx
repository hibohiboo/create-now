import { NextPage } from 'next'
import Head from 'next/head'
import {
  Box,
  Button,
  List,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import { Search } from '@material-ui/icons'
import { useBossesViewModel } from '~/store/modules/lostModule'
import { contentLanguageMap } from '~/lib/i18n'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import InputField from '~/components/form/InputField'
import { useStyles } from '~/pages/lostrpg/characters/[lng]/list'

const Page: NextPage = () => {
  const vm = useBossesViewModel()
  const t = vm.i18n.t
  const classes = useStyles()
  return (
    <Container>
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[vm.i18n.activeLocale]}
        />
      </Head>
      <div style={{ display: 'none' }}>
        <LanguageSelector i18n={vm.i18n} />
      </div>
      <h2>{t('lostrpg_boss_list_title')}</h2>
      <Box mt={2}>
        {vm.authUser ? (
          <Link
            href={`/lostrpg/bosses/[lng]/edit`}
            as={`/lostrpg/bosses/${vm.i18n.activeLocale}/edit`}
          >
            {t('common_create')}
          </Link>
        ) : (
          <Link href="/auth/login">{t('lostrpg_camps_list_please_login')}</Link>
        )}
      </Box>

      <Box display="flex" style={{ maxWidth: '200px', minWidth: '50px' }}>
        <InputField
          model={vm.search}
          type="text"
          prop="name"
          labelText={t('common_name')}
          changeHandler={vm.searchHandler}
        />
        <Button variant="contained" color="primary" onClick={vm.filterHandler}>
          <Search />
        </Button>
      </Box>

      <div>
        {vm.pagination.loading && <div>...</div>}
        {!vm.pagination.loading && (
          <List
            component="ul"
            aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader">
                {t('lostrpg_boss_list_title')}
              </ListSubheader>
            }
            className={classes.root}
          ></List>
        )}
        {vm.bosses.map((item) => (
          <ListItemLink
            href={{
              pathname: '/lostrpg/public/[lng]/[view]',
              query: { id: item.id },
            }}
            key={item.id}
            as={`/lostrpg/public/${vm.i18n.activeLocale}/boss?id=${item.id}`}
          >
            <ListItemText primary={item.name} />
          </ListItemLink>
        ))}
        {vm.pagination.hasMore && !vm.pagination.loading && !vm.search.name && (
          <Button onClick={vm.loadMoreHandler}>
            次の{vm.pagination.limit}件
          </Button>
        )}
      </div>
      <Link href={vm.beforePage}>{t('common_back')}</Link>
    </Container>
  )
}
export default Page
