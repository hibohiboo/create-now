// import { GetStaticProps } from 'next'
import Head from 'next/head'
import Layout, { siteTitle } from '~/components/pages/game/Layout'
import utilStyles from '~/styles/utils.module.scss'
import { viewModel } from '~/store/modules/gameModule'
import Controller from '~/components/molecules/game/Controller'
import World from '~/components/organisms/game/World'
export default function Home() {
  const vm = viewModel()
  return (
    <Layout home={true}>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <Controller onClick={vm.handleInput} />
        <World
          tiles={[
            [1, 2],
            [3, 4],
          ]}
        />
      </section>
    </Layout>
  )
}
