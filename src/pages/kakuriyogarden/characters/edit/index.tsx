import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { NextPage } from 'next'
import Head from 'next/head'

import fetch from 'isomorphic-unfetch'
import Edit from '~/domain/kakuriyogarden/components/character/edit'
import { Magic } from '~/domain/kakuriyogarden/classes/gemory/magic'

const Page: NextPage<{
  id: string
  pageTitle: string
  skills: any
}> = function (ctx) {
  const dispatch = useDispatch()

  useEffect(() => {}, [])

  const { id, skills } = ctx
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css"
        />
        <title>{ctx.pageTitle}</title>
      </Head>
      <Edit cardList={skills}>{id}</Edit>
      <div>{JSON.stringify(skills)}</div>
    </>
  )
}
export const getStaticProps = async (context) => {
  const postId = context.params?.id
  const sheet = (context.query?.sheet ||
    '1uI6lGPfsXfn77tKjLBzKaSl9lHrTsN5la-tTDo9gPZw') as string
  const data = await getSheetData(sheet, 'cards', 'B2:S')
  const skills = data.values.map(csvToCard)
  return {
    props: {
      id: sheet,
      pageTitle: 'カクリヨガーデン: キャラクター編集',
      skills,
    },
    revalidate: 60, // ここを追加
  }
}

const fetchUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
const key = process.env.GOOGLE_API_KEY
export const getSheetData = async (
  spreadId: string,
  sheet: string,
  range: string,
): Promise<{ values: string[][] }> => {
  const res = await fetch(
    `${fetchUrl}/${spreadId}/values/${sheet}!${range}?key=${key}`,
  )
  if (res.status >= 400) {
    return { values: [[]] }
  }
  const json = await res.json()
  if (!json.values) {
    console.log('can not get values', json)
    return { values: [[]] }
  }

  return json as { values: string[][] }
}

const csvToCard: (items: any[]) => Magic = (items) => {
  const [
    name,
    nameKana,
    type,
    kind,
    exp,
    timing,
    count,
    range,
    target,
    successRate,
    effect,
    gardeneffect,
    description,
    strTags,
    url,
    siteName,
    siteUrl,
  ] = items

  const tags = strTags ? strTags.split(',') : []
  const image = {
    url,
    source: siteName,
    sourceUrl: siteUrl,
  }
  const maxLevel = 1
  const level = 1
  const id = '1'
  return {
    id,
    name,
    nameKana,
    type,
    timing,
    count,
    range,
    target,
    maxLevel,
    level,
    successRate,
    effect,
    description,
    gardeneffect,
    tags,
    image,
    kind,
    exp,
  }
}

// Page.getStaticPaths = getLocalePaths

export default Page
