import React, { useEffect } from 'react'
import { NextPage } from 'next'
import Head from 'next/head'
import { useDispatch } from 'react-redux'
import Link from '~/components/atoms/mui/Link'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import useI18n from '~/hooks/use-i18n'
import { contentLanguageMap } from '~/lib/i18n'
import LanguageSelector from '~/components/organisms/i18n/LanguageSelector'
import { useAuth, createAuthClientSide } from '~/store/modules/authModule'

const Page: NextPage = () => {
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
        <title>{t('lostrpg_index_title')}</title>
      </Head>
      <h2>{t('lostrpg_index_title')}</h2>
      <LanguageSelector i18n={i18n} />

      <p>
        <a
          href="https://lostrpg-751c1.firebaseapp.com/lost/"
          rel="noopener noreferrer"
        >
          LOSTRPG
        </a>
      </p>
      <ul>
        <li>
          <Link href="/lostrpg/camps/list">{t('lostrpg_index_campList')}</Link>
        </li>
        <li>
          <Link
            href="/lostrpg/characters/[lng]/list"
            as={`/lostrpg/characters/${i18n.activeLocale}/list`}
          >
            {t('lostrpg_index_characters')}
          </Link>
        </li>
      </ul>
      {authUser ? (
        <ul>
          <li>
            <Link href="/lostrpg/camps/edit">{`${t('lostrpg_common_camp')}${t(
              'common_create',
            )}`}</Link>
          </li>
          <li>
            <Link
              href={`/lostrpg/characters/[lng]/edit`}
              as={`/lostrpg/characters/${i18n.activeLocale}/edit`}
            >
              {`${t('lostrpg_common_character')}${t('common_create')}`}
            </Link>
          </li>
        </ul>
      ) : (
        <p>
          <Link href="/auth/login">{t('lostrpg_camps_list_please_login')}</Link>
        </p>
      )}

      <div style={{ padding: '10px' }}>
        {i18n.t('lostrpg_index_please_translate')}
        <a
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
