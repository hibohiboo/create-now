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
      </ul>
    </>
  )
}
export default Created
