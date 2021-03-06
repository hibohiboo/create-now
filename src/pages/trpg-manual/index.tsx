import Head from 'next/head'
import * as React from 'react'
import { NextPage } from 'next'
import ImageArea from '~/components/organisms/trpg-manual/ImageArea'
import InputArea from '~/components/organisms/trpg-manual/InputArea'

import Footer from '~/components/organisms/common/Footer'

export const MyJSX = () => (
  <style jsx>{`
    .container {
      min-height: 100vh;
      padding: 0 0.5rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    main {
      padding: 5rem 0;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    footer {
      width: 100%;
      height: 100px;
      border-top: 1px solid #eaeaea;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    footer img {
      margin-left: 0.5rem;
    }

    footer a {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    a {
      color: inherit;
      text-decoration: none;
    }

    .title a {
      color: #0070f3;
      text-decoration: none;
    }

    .title a:hover,
    .title a:focus,
    .title a:active {
      text-decoration: underline;
    }

    .title {
      margin: 0;
      line-height: 1.15;
      font-size: 4rem;
    }

    .title,
    .description {
      text-align: center;
    }

    .description {
      line-height: 1.5;
      font-size: 1.5rem;
    }

    code {
      background: #fafafa;
      border-radius: 5px;
      padding: 0.75rem;
      font-size: 1.1rem;
      font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
        DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
    }

    .grid {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;

      max-width: 800px;
      margin-top: 3rem;
    }

    .card {
      margin: 1rem;
      flex-basis: 45%;
      padding: 1.5rem;
      text-align: left;
      color: inherit;
      text-decoration: none;
      border: 1px solid #eaeaea;
      border-radius: 10px;
      transition: color 0.15s ease, border-color 0.15s ease;
    }

    .card:hover,
    .card:focus,
    .card:active {
      color: #0070f3;
      border-color: #0070f3;
    }

    .card h3 {
      margin: 0 0 1rem 0;
      font-size: 1.5rem;
    }

    .card p {
      margin: 0;
      font-size: 1.25rem;
      line-height: 1.5;
    }

    @media (max-width: 600px) {
      .grid {
        width: 100%;
        flex-direction: column;
      }
    }
  `}</style>
)
export const MyGlobalJSX = () => (
  <style jsx global>{`
    html,
    body {
      padding: 0;
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    }

    * {
      box-sizing: border-box;
    }
  `}</style>
)

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>僕の私のTRPG説明書</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <h1>TRPG自己紹介シートメーカー</h1>
        <p>
          <a href="https://twitter.com/Frog_003">かえる３号</a>
          さんのTRPG自己紹介シートを入力できるようにしました。
          作成した画像は、右クリック（スマホなら長押し）でダウンロードしてお使いください。
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <InputArea />
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
