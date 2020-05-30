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
import { languages, contentLanguageMap, defaultLanguage } from '~/lib/i18n'
import useI18n from '~/hooks/use-i18n'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'
import { readFile } from '~/lib/fileReader'
import Table from '~/components/organisms/mui/Table'
import * as lostData from '~/data/lostrpg'
import * as lostDataEn from '~/data/lostrpg-en'

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

const Page: React.FC<{
  lng: string
  lngDict: { [key: string]: string }
  sample: string
  sample2: string
}> = ({ lng, lngDict, sample, sample2 }) => {
  const classes = useStyles()
  const t = lngDict
  const { sampleTable } = lng === defaultLanguage ? lostData : lostDataEn
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
      <Table table={sampleTable} />
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
      <Box my={2}>
        <Button
          startIcon={<FileCopy />}
          onClick={() => {
            if (navigator.clipboard) navigator.clipboard.writeText(sample2)
          }}
          variant="contained"
          color="primary"
        >
          {t['common_copy']}
        </Button>

        <Box mt={2} className={classes.preWrapper}>
          <pre>{sample2}</pre>
        </Box>
      </Box>

      <Link href="/lostrpg">{t['common_back']}</Link>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const { default: lngDict = {} } = await import(`~/locales/${params.lng}.json`)
  const sample = readFile('data/samples', 'scenario.md')
  const sample2 = readFile('data/samples', 'scenario2.md')
  return {
    props: { lng: params.lng, lngDict, sample, sample2 },
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default Page
