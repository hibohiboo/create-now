import Head from 'next/head'
import * as React from 'react'
import { NextPage } from 'next'
import Footer from '~/components/organisms/common/Footer'
import { MyJSX, MyGlobalJSX } from '../trpg-manual'
import SkillCard from '~/components/organisms/hakoniwa/SkillCard'
const Home: NextPage = () => {
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
        <div className="skill-card">
          <div className="wrapper">
            <div className="base">
              <div className="skillLabel">ラベル</div>
            </div>
          </div>
        </div>
        <SkillCard />
        <Footer />
      </main>
    </div>
  )
}

export default Home
