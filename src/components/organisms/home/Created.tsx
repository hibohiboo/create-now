import React from 'react'
import Link from '../../atoms/mui/Link'

const Created: React.FC = () => {
  return (
    <>
      <h4>now製作物</h4>
      <ul>
        <li>
          <Link href="/trpg-manual"> 僕の私のTRPG説明書 </Link>
        </li>
        <li>
          <Link href="/pdf/entrySheet"> エントリーシートPDF作成 </Link>
        </li>
        <li>
          <Link href="/pdf/trailer"> トレーラーPDF作成 </Link>
        </li>
        <li>
          <Link href="/lostrpg"> LOSTRPG 支援 </Link>
        </li>
        <li>
          <Link href="/posts"> チュートリアル ブログ </Link>
        </li>
        <li>
          <Link href="/memoList"> 卓メモ </Link>
        </li>
        <li>
          <Link href="/tyrano/udon?tyrano_sheet=15nPd3S39OZZVxHUK0odXxcuDnYT_YIsK1oVP2zcKyd0&is2d=true&container=true">
            ティラノウドン
          </Link>
        </li>
        <li>
          <Link href="/rooper/card-maker">
            惨劇RoopeR オリジナルカードメイカー
          </Link>
        </li>
        <li>
          <Link href="/rooper/card-maker-list">
            惨劇RoopeR オリジナルカードセット一覧
          </Link>
        </li>
      </ul>
    </>
  )
}
export default Created
