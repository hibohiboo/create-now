import Head from 'next/head'
import * as React from 'react'
import { NextPage } from 'next'
import Footer from '~/components/organisms/common/Footer'
import SkillList from '~/components/organisms/hakoniwa/SkillList'
import { useViewModel } from '~/store/modules/hakoniwaModule/viewModel/skills'
const Page: NextPage = (ctx: any) => {
  const cardData = {
    type: 'スキル',
    name: '強打',
    timing: 'アクション',
    count: 4,
    target: '自身',
    range: 0,
    tags: ['攻撃', '剣'],
    effect: `剣のダメージ+[Lv]。
リンク1。

リンク3。
`,
    description: `気合の声を上げ、全力で相手を叩き伏せる。あるいはいろいろする
    気合の声を上げ、全力で相手を叩き伏せる。
    気合の声を上げ、全力で相手を叩き伏せる。
    `,
    id: 'b-1',
    image: null,
    maxLevel: null,
    level: null,
    link: 2,
    // image: {
    //   text: '自作',
    //   url: '/images/icons/icon-72x72.png',
    // },
  }

  const vm = useViewModel(ctx)

  return (
    <div className="container hakoniwa">
      <Head>
        <title>箱庭開拓TRPG</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <h1>カードリスト</h1>
        <SkillList width={600} height={800} vm={vm} />

        <Footer />
      </main>
    </div>
  )
}

export default Page

Page.getInitialProps = async ({ query }) => {
  const sheet = (query.sheet ||
    '1Cp0_Kp1Du7p2PmBD2VH4S2fkTt8ciWkjg8lj2hLIIYs') as string

  return {
    sheet,
  }
}
