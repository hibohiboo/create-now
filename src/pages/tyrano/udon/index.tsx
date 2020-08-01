import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
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
      <DraggablePanel>
        <iframe
          src="/third/udonarium/index.html"
          width="1240px"
          height="800px"
          scrolling="no"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </DraggablePanel>
    </div>
  )
}
