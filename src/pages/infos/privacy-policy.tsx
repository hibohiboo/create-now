import { NextPage } from 'next'
import { Container } from '@material-ui/core'
import Footer from '../../components/organisms/common/Footer'

const Page: NextPage = () => {
  return (
    <Container>
      <div className="wrapper">
        <div className="container">
          <h1>プライバシーポリシー</h1>
          <h2>個人情報の利用目的</h2>
          <p>
            当サイトでは、キャラクターシートの登録などの際に、名前（ハンドルネーム）、Twitter連携等の個人情報をご登録いただく場合がございます。
          </p>
          <p>
            これらの個人情報は質問に対する回答やユーザの判別の場合に利用させていただくものであり、
            個人情報をご提供いただく際の目的以外では利用いたしません。
          </p>
          <p>
            Twitter連携の権限については
            <a href="/infos/twitter-connect">こちらのページ</a>
            をご確認ください。
          </p>
          <h2>個人情報の第三者への開示</h2>
          <p>
            当サイトでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。
          </p>
          <ul>
            <li>本人のご了解がある場合</li>
            <li>法令等への協力のため、開示が必要となる場合</li>
          </ul>
          <h2>個人情報の開示、訂正、追加、削除、利用停止</h2>
          <p>
            ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
          </p>
          <h2>アクセス解析ツールについて</h2>
          <p>
            当サイトでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。この規約に関して、詳しくは
            <a
              target="_blank"
              href="https://www.google.com/analytics/terms/jp.html"
              rel="noopener noreferrer"
            >
              こちら
            </a>
            をクリックしてください。
          </p>
          <h2>免責事項</h2>
          <p>
            当サイトからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
          </p>
          <p>
            当サイトのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
            当サイトに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。
          </p>
          <h2>プライバシーポリシーの変更について</h2>
          <p>
            当サイトは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
          </p>
          <p>
            修正された最新のプライバシーポリシーは常に本ページにて開示されます。
          </p>
        </div>
      </div>
      <Footer />
    </Container>
  )
}

export default Page
