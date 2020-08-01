import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
import DraggableDialog from '~/components/atoms/mui/DraggableDialog'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
interface Prop {
  base_path: string
}
export default function Home({ base_path }: Prop) {
  return (
    <div>
      <Head>
        <title>Loading Udonarium</title>
      </Head>
      <DraggableDialog />
      <DraggablePanel />
    </div>
  )
}
