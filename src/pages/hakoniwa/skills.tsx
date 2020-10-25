import Head from 'next/head'
import * as React from 'react'
import { NextPage } from 'next'
import Footer from '~/components/organisms/common/Footer'
import CardList from '~/components/organisms/hakoniwa/CardList'
import SelectedCardList from '~/components/organisms/hakoniwa/SelectedCardList'
import { useViewModel } from '~/store/modules/hakoniwaModule/viewModel/skills'
const Page: NextPage = (ctx: any) => {
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
        <button onClick={vm.createZip}>zip出力</button>
        <div>
          絞り込み:タイプ
          <input
            type="text"
            onChange={(e) => vm.changeFilterType(e.target.value)}
          ></input>
        </div>
        <div>
          絞り込み:種別
          <input
            type="text"
            onChange={(e) => vm.changeFilterKind(e.target.value)}
          ></input>
        </div>
        <div>
          絞り込み:タグ
          <input
            type="text"
            onChange={(e) => vm.changeFilterTag(e.target.value)}
          ></input>
        </div>
        <div style={{ display: 'flex' }}>
          <SelectedCardList width={250} height={800} vm={vm} />
          <CardList width={600} height={800} vm={vm} />
        </div>

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
