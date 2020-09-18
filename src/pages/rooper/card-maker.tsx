import Head from 'next/head'
import * as React from 'react'
import { NextPage } from 'next'
import ImageArea from '~/components/organisms/rooper/ImageArea'
// import InputArea from '~/components/organisms/rooper/InputArea'
import Footer from '~/components/organisms/common/Footer'
import { MyJSX, MyGlobalJSX } from '../trpg-manual'

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>惨劇RoopeR カードメイカー</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <h1>惨劇RoopeR オリジナルカードメイカー</h1>
        <p>
          画像をドラッグ＆ドロップで惨劇RoopeR風のカードが作成できます。画像サイズは620×866です。
          <br></br>
          作成した画像は、右クリックでダウンロードして
          <a
            style={{ textDecoration: 'underline' }}
            href="https://rooper-401ef.web.app/"
          >
            惨劇Udonarium
          </a>
          などにお使いください。
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline' }}
            href="http://bakafire.main.jp/rooper/sr_top.htm"
          >
            惨劇コモンズχ作成:BakaFire様、紺ノ玲様
          </a>
          。
        </p>
        <div>
          <ImageArea />
        </div>
      </main>
      <Footer />
      <MyJSX />
      <MyGlobalJSX />
    </div>
  )
}

export default Home
