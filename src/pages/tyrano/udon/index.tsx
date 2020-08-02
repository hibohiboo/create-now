import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from '~/components/templates/tyrano/Layout'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
)

export default function Home() {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Head>
        <title>Loading Udonarium</title>
      </Head>
      <UdonariumPanel />
      <TyranoPanel />
    </div>
  )
}
