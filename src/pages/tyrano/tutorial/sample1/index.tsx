import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout from '~/components/templates/tyrano/Layout'
interface Prop {
  base_path: string
}
export default function Home({ base_path }: Prop) {
  return (
    <Layout base_path={base_path}>
      <Head>
        <title>Loading TyranoScript</title>
      </Head>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: { base_path: '/mygame/' },
  }
}
