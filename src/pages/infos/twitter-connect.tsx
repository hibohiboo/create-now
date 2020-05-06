import { NextPage } from 'next'
import { Container } from '@material-ui/core'
import Footer from '../../components/organisms/common/Footer'

const Page: NextPage = () => {
  return (
    <Container>
      <h1>Twitter連携の権限について</h1>
      <p>
        このサイトにログインする際のTwitterとの連携に関して、「どの権限をどのように使うのかは以下をご覧ください。
      </p>
      <img src="/images/others/twitter.jpg" alt="Twitter連携画像" />
      <h4>許可された3つの権限と、その利用について</h4>
      <dl>
        <dt>
          ・1.
          このアカウントのタイムラインに表示されるツイート（非公開ツイートを含む）や、リストとコレクションを確認する。
        </dt>
        <dd>利用しません。</dd>
        <dt>
          ・2. このアカウントでプロフィール情報とアカウントの設定を確認する。
        </dt>
        <dd>プロフィール情報から、名前と画像を利用しています。</dd>
        <dt>・3. フォロー、ミュート、ブロックしているアカウントを確認する。</dt>
        <dd>利用しません。</dd>
      </dl>

      <Footer />
    </Container>
  )
}

export default Page
