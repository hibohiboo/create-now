import { NextPage } from 'next'
import Link from '~/components/atoms/mui/Link'
import { Container } from '@material-ui/core'
import Footer from '~/components/organisms/common/Footer'

const Page: NextPage = () => {
  return (
    <Container>
      <h2>LOSTRPG キャンプ一覧</h2>
      <Link href="/lostrpg/camps/create">作成</Link>
      <Link href="/lostrpg">戻る</Link>
      <Footer />
    </Container>
  )
}

export default Page
