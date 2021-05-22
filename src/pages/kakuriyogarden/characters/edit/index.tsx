import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import { getCharacter } from '~/api/firestoreAPI'
import Edit from '~/domain/kakuriyogarden/components/character/edit'
import Head from 'next/head'

const Page: NextPage<{
  id: string
  pageTitle: string
}> = function (ctx) {
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  const { id } = ctx
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
        <title>{ctx.pageTitle}</title>
      </Head>
      <Edit>{id}</Edit>
    </>
  )
}

Page.getInitialProps = async ({ query }) => {
  const id = query.id as string

  return { id, pageTitle: 'カクリヨガーデン: キャラクター編集' }
}
// Page.getStaticPaths = getLocalePaths

export default Page
