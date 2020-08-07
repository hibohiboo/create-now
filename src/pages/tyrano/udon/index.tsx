import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from '~/components/templates/tyrano/Layout'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'

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
  const vm = useViewModel()
  console.log('viewModel', vm)
  return (
    <div className={classes.root}>
      <Head>
        <title>Loading Udonarium</title>
      </Head>
      <UdonariumPanel />
      <TyranoPanel
        name={vm.tyranoSample}
        defaultHeight={450}
        defaultWidth={800}
      />
      <TyranoPanel
        name={vm.tyranoVchat}
        defaultHeight={800}
        defaultWidth={640}
      />
      <button onClick={vm.sendMessage}>test send </button>
    </div>
  )
}
