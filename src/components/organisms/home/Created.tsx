import React from 'react'
import Link from '../../atoms/mui/Link'

const Created: React.FC = () => {
  return (
    <>
      <h4>now製作物</h4>
      <ul>
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
      </ul>
    </>
  )
}
export default Created
