import * as React from 'react'
import { NextPage } from 'next'
import Link from './components/atoms/mui/Link'

const Home: NextPage = () => {
  return (
    <div className="container">
      <main>
        <h1>なう開発工房</h1>
        <ul>
          <li>
            <Link href="/entrySheet"> エントリーシートPDF作成 </Link>
          </li>
          <li>
            <Link href="/trailer"> トレーラーPDF作成 </Link>
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
