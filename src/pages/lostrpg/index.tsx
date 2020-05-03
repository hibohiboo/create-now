import { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import EN from '~/locales/en.json'
import JA from '~/locales/ja.json'

const Page: NextPage = () => {
  const i18n = useI18n()

  useEffect(() => {
    i18n.locale('ja', JA)
  }, [])
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
      <div style={{ padding: '5px' }}>
        <a
          href="#"
          onClick={() => {
            i18n.locale('en', EN)
          }}
        >
          English
        </a>

        <a
          href="#"
          style={{ marginLeft: '10px' }}
          onClick={() => {
            i18n.locale('ja', JA)
          }}
        >
          日本語
        </a>
      </div>
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
