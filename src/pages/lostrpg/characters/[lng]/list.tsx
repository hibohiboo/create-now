import Link from 'next/link'
import Head from 'next/head'
import { Box, Button } from '@material-ui/core'
import useI18n from '~/hooks/use-i18n'
import { languages, contentLanguageMap } from '~/lib/i18n'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'

const HomePage = () => {
  const i18n = useI18n()
  const t = i18n.t
  return (
    <Container>
      <Head>
        <meta
          httpEquiv="content-language"
          content={contentLanguageMap[i18n.activeLocale]}
        />
      </Head>
      <h2>{t('lostrpg_character_list_title')}</h2>
      <LanguageSelector i18n={i18n} />
      <div>Current locale: {i18n.activeLocale}</div>
      <Link href="/de">
        <a>Use client-side routing to change language to </a>
      </Link>
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
