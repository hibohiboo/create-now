import { NextPage } from 'next'
import Head from 'next/head'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'

const Page: NextPage = () => {
  const i18n = useI18n()

  return (
    <Container>
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale]}
        />
        <title>{i18n.t('lostrpg_index_title')}</title>
      </Head>
      <h2>{i18n.t('lostrpg_index_title')}</h2>
      <LanguageSelector i18n={i18n} />
      <ul>
        <li>
          <Link href="/lostrpg/camps/list">
            {i18n.t('lostrpg_index_campList')}
          </Link>
        </li>
      </ul>

      <Link href="/"> {i18n.t('common_back')}</Link>
    </Container>
  )
}

export default Page
