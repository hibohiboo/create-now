import * as React from 'react'
import { NextPage } from 'next'
import Link from './components/atoms/mui/Link'

const Home: NextPage = () => {
  return (
    <div className="container">
      <main>
        <h1>なう開発工房</h1>
        <h2>now製作物</h2>
        <ul>
          <li>
            <Link href="/entrySheet"> エントリーシートPDF作成 </Link>
          </li>
          <li>
            <Link href="/trailer"> トレーラーPDF作成 </Link>
          </li>
        </ul>
        <h2>firebase製作物</h2>
        <ul>
          <li>
            <a
              href="https://lostrpg-751c1.firebaseapp.com/lost/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LOSTRPG~廃墟の森の子供たち~
            </a>
          </li>
          <li>
            <a
              href="https://rooper-tool.web.app/"
              target="_blank"
              rel="noopener noreferrer"
            >
              惨劇RoopeRオンラインツール
            </a>
          </li>
          <li>
            <a
              href="https://wasureta-d6b34.firebaseapp.com/insane/"
              target="_blank"
              rel="noopener noreferrer"
            >
              インセイン ハンドアウトメイカー
            </a>
          </li>
          <li>
            <a
              href="https://wasureta-d6b34.firebaseapp.com/info-graph/"
              target="_blank"
              rel="noopener noreferrer"
            >
              情報項目グラフ化ツール
            </a>
          </li>
          <li>
            <a
              href="https://garden-2a6de.firebaseapp.com/rulebook"
              target="_blank"
              rel="noopener noreferrer"
            >
              孤島異能研究機関崩壊後TRPG Garden
            </a>
          </li>
          <li>
            <a
              href="https://wasureta-d6b34.firebaseapp.com/lobby/"
              target="_blank"
              rel="noopener noreferrer"
            >
              「ロビー」... チャットツールサンプル
            </a>
          </li>
        </ul>
      </main>

      <footer>
        <a
          href="https://twitter.com/hibohiboo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Presented by hibohiboo
        </a>
      </footer>
    </div>
  )
}

export default Home
