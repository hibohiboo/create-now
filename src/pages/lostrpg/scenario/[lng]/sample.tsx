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
import { FileCopy } from '@material-ui/icons'
import { languages, contentLanguageMap } from '~/lib/i18n'
import useI18n from '~/hooks/use-i18n'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'
import { readFile } from '~/lib/fileReader'
import Table from '~/components/organisms/mui/Table'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  preWrapper: {
    border: 'solid 1px #000000',
    padding: theme.spacing(2),
  },
}))

const table = {
  title: '記法一覧',
  columns: ['やりたいこと', '記法', 'アイコン'],
  rows: [
    { cells: ['シナリオタイトル', '#', ''] },
    {
      cells: [
        '推奨するプレイヤー人数',
        '## 〇人 {.players}',
        '<i class="fas fa-user-friends"></i>推奨人数：〇人',
      ],
    },
    {
      cells: [
        'シナリオの所要時間目安',
        '## 〇時間 {.time}',
        '<i class="far fa-clock"></i>プレイ時間：〇時間',
      ],
    },
    {
      cells: [
        'リミット',
        '## 〇 {.limit}',
        '<i class="fas fa-hourglass-half"></i>リミット：〇',
      ],
    },
    {
      cells: [
        '注意書き',
        '## 注意 {.caution}',
        '<i class="fas fa-exclamation-triangle"></i>注意',
      ],
    },

    { cells: ['フェイズ', '## 〇フェイズ', ''] },
    { cells: ['シーン', '### シーン', ''] },
    {
      cells: [
        'チェックポイント',
        '### チェックポイント {.checkpoint}',
        '<i class="far fa-check-circle"></i>チェックポイント',
      ],
    },
    {
      cells: ['道', '### 道 {.path}', '<i class="fas fa-shoe-prints"></i>道'],
    },
    { cells: ['描写', '#### 描写', '<i class="far fa-image"></i>描写'] },
    {
      cells: [
        '戦闘',
        '#### 戦闘 {.battle}',
        '<i class="fas fa-ghost"></i>戦闘',
      ],
    },
    {
      cells: ['障害', '#### 障害 {.lock}', '<i class="fas fa-lock"></i>障害'],
    },
    {
      cells: [
        '探索オブジェクト',
        '#### 探索 {.search}',
        '<i class="fas fa-search"></i>探索',
      ],
    },

    {
      cells: [
        'リミット増加オブジェクト',
        '#### オブジェクト {.limitUp}',
        '<i class="fas fa-hourglass-start"></i>オブジェクト',
      ],
    },
    {
      cells: ['ヌシ', '#### ヌシ {.boss}', '<i class="fas fa-dragon"></i>ヌシ'],
    },
    // {
    //   cells: [
    //     'キーイベント',
    //     '#### キーイベント {.key}',
    //     '<i class="fas fa-key"></i>キーイベント',
    //   ],
    // },
    // {
    //   cells: [
    //     'ロックイベント',
    //     '#### ロックイベント {.keyLock}',
    //     '<i class="fab fa-expeditedssl"></i>ロックイベント',
    //   ],
    // },

    {
      cells: [
        '判定',
        '##### 《判定/分野 x》 {.roll}',
        '<i class="fas fa-dice"></i>《判定/分野 x》',
      ],
    },
    {
      cells: [
        'アイテム',
        '##### アイテム {.item}',
        '<i class="fas fa-shopping-bag"></i>アイテム',
      ],
    },
    {
      cells: ['道', '##### 道 {.path}', '<i class="fas fa-shoe-prints"></i>道'],
    },
    {
      cells: ['表', '##### 表 {.table}', '<i class="fas fa-list-ol"></i>表'],
    },
  ],
}

const Page: React.FC<{
  lng: string
  lngDict: { [key: string]: string }
  sample: string
}> = ({ lng, lngDict, sample }) => {
  const classes = useStyles()
  const t = lngDict
  return (
    <Container>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[lng]} />
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
      </Head>
      <h2>{t['lostrpg_scenario_sample_title']}</h2>
      <h3></h3>
      <Table table={table} />
      <h3>{t['lostrpg_scenario_sample_import']}</h3>
      <p>{t['lostrpg_scenario_sample_import_description']}</p>
      <p>
        <Button
          startIcon={<FileCopy />}
          onClick={() => {
            // httpだとnavigator.clipboardにアクセスできない。httpsにする必要がある。
            if (navigator.clipboard) navigator.clipboard.writeText(sample)
          }}
          variant="contained"
          color="primary"
        >
          {t['common_copy']}
        </Button>
      </p>
      <Box mt={2} className={classes.preWrapper}>
        <pre>{sample}</pre>
      </Box>

      <Link href="/lostrpg">{t['common_back']}</Link>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const { default: lngDict = {} } = await import(`~/locales/${params.lng}.json`)
  const sample = readFile('data/samples', 'scenario.md')
  return {
    props: { lng: params.lng, lngDict, sample },
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default Page
