import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
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
      <UdonariumPanel />
    </div>
  )
}
