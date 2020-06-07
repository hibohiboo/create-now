import { GetStaticProps } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import '~/lib/vendor/tyranoscript/tyrano/libs/jquery-ui'

export default function Home({
  base,
}: {
  base: {
    title: string
  }[]
}) {
  return (
    <div>
      <Head>
        <title>Loading TyranoScript</title>
        <meta name="viewport" content=" user-scalable=no" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="stylesheet" href="/tyrano/tyrano.css" />
      </Head>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  }
}
