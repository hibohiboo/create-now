import { NextPage } from 'next'
import Link from '~/components/atoms/mui/Link'
import { Container } from '@material-ui/core'
import Footer from '~/components/organisms/common/Footer'

const Page: NextPage = () => {
  return (
    <Container>
      <h2>LOSTRPG サポートページ</h2>
      <ul>
        <li>
          <Link href="/lostrpg/camps/list">キャンプ一覧</Link>
        </li>
      </ul>
      <Link href="/">戻る</Link>
      <Footer />
    </Container>
  )
}

export default Page
