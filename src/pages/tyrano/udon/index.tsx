import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
interface Prop {
  base_path: string
}
export default function Home({ base_path }: Prop) {
  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(800)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <div>
      <Head>
        <title>Loading Udonarium</title>
      </Head>
      <DraggablePanel width={width} height={height} onResize={onResize}>
        <iframe
          src="/third/udonarium/index.html"
          width={`${width}px`}
          height={`${height}px`}
          scrolling="no"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </DraggablePanel>
    </div>
  )
}
