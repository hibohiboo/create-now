// import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '~/components/pages/game/Layout'
import utilStyles from '~/styles/utils.module.scss'
import Controller from '~/components/molcures/game/Controller'

export default function Home() {
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Controller />
      </section>
    </Layout>
  )
}
