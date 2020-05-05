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
        <li>
          <Link
            href="/lostrpg/characters/[lng]/list"
            as={`/lostrpg/characters/${i18n.activeLocale}/list`}
          >
            {i18n.t('lostrpg_index_characters')}
          </Link>
        </li>
      </ul>
      <div style={{ padding: '10px' }}>
        {i18n.t('lostrpg_index_please_translate')}
        <a
          target="_blank"
          href="https://github.com/hibohiboo/create-now/blob/master/src/data/lostrpg-en.ts"
          rel="noopener noreferrer"
        >
          {i18n.t('lostrpg_index_begin_translate')}
        </a>
      </div>
      <Link href="/">{i18n.t('common_back')}</Link>
    </Container>
  )
}

export default Page
