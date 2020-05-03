import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Link from 'next/link'
import Head from 'next/head'
import { Box, Button } from '@material-ui/core'
import useI18n from '~/hooks/use-i18n'
import { languages, contentLanguageMap } from '~/lib/i18n'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'

const HomePage = () => {
  const i18n = useI18n()
  const t = i18n.t
  const authUser = useAuth()
  const dispatch = useDispatch()
  useEffect(() => {
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
      <h2>{t('lostrpg_character_list_title')}</h2>
      <LanguageSelector i18n={i18n} />
      <Box mt={2}>
        {authUser ? (
          <Link
            href={`/lostrpg/characters/[lng]/edit`}
            as={`/lostrpg/characters/${i18n.activeLocale}/edit`}
          >
            <a>{i18n.t('common_create')}</a>
          </Link>
        ) : (
          <></>
        )}
      </Box>
      <Link href="/lostrpg">
        <a>{t('common_back')}</a>
      </Link>
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
