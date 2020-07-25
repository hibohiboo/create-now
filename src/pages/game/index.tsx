// import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '~/components/pages/game/Layout'
import utilStyles from '~/styles/utils.module.scss'
import Controller from '~/components/molecules/game/Controller'
import { viewModel } from '~/store/modules/gameModule'
export default function Home() {
  const vm = viewModel()
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Controller onClick={vm.handleInput} />
      </section>
    </Layout>
  )
}
