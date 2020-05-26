import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import Head from 'next/head'
import {
  Box,
  Button,
  List,
  ListItemText,
  ListSubheader,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
// import { SearchIcon } from '@material-ui/icons'
import SearchIcon from '@material-ui/icons/Search'
import { languages, contentLanguageMap } from '~/lib/i18n'
import useI18n from '~/hooks/use-i18n'
import Link from '~/components/atoms/mui/Link'
import ListItemLink from '~/components/atoms/mui/ListItemLink'
import Container from '~/components/organisms/lostrpg/LostrpgContainer'
import InputField from '~/components/form/InputField'

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  preWrapper: {
    border: 'solid 1px #000000',
    padding: theme.spacing(2),
  },
}))

const Page: React.FC<{ lng: string; lngDict: { [key: string]: string } }> = ({
  lng,
  lngDict,
}) => {
  const classes = useStyles()
  const t = lngDict
  return (
    <Container>
      <Head>
        <meta httpEquiv="content-language" content={contentLanguageMap[lng]} />
      </Head>
      <h2>{t['lostrpg_scenario_sample_title']}</h2>
      <h3>{t['lostrpg_scenario_sample_import']}</h3>
      <p>{t['lostrpg_scenario_sample_import_description']}</p>
      <Box mt={2} className={classes.preWrapper}>
        <pre>{`
# シナリオタイトル
## キャンプフェイズ
### プロローグ
#### 描写
都有小学校を拠点としたキャンプ、都有キャンプ。みなさんはそこに所属しています。

夕食の時間、皆は同じ教室でご飯を食べます。カレーのいい匂いが漂っています。
遊び足りない子供たちを席につかせ、リーダーの「いただきます」の号令を待っています。
しかし、今日は全員席についても、リーダーは難しい顔でいました。
ちなみに、このキャンプでリーダーを務めているのは、割れたメガネをした青年の コータローくんです。
彼は、意を決したように顔をあげて言いました。

「みんな、そのカレーが、最後のカレーだ。塩や醤油も少ない。味噌はもう切れた」

「えー、もうカレー食べられないの？」

「味のない肉なんて、イヤだよう」

「味噌汁最近出ないと思ってたら……」

教室内は騒然となります。コータローくんは、皆に提案があるといいます。

▽「ずっと、比較的安全な森を探検して、ものを集めてきたけど、もうこの辺りは探し尽くしたみたいだ。
実は、向こうの＜フィールド＞には、レストランがあるはずなんだ」

▽「危険なことはさせたくないと思って、避けてきたけれど……こうなったら、仕方ない。 誰か、行ってくれる人はいないだろうか」

コータローはそこで、皆を見渡します。小さな子も、不安そうに周りを見渡しています。

（ここで、「おにいちゃん、もうオムライス食べられない？」などとPCに訴えてください）

PCが＜フィールド＞への挑戦に名乗りをあげたら、このフェイズの目的は達成です。 「いただきます」とカレーを食べて、冒険の準備に移ります。

コータロー▽ 「本当に助かったよ。君たちの探検用の食料や水は、しっかり準備させてもらうからね」

▽「とはいえ、あんまり余裕があるわけでもないんだ。あまり長く＜フィールド＞にいても、 身体によくないっていうし、4日分用意させてもらったよ」

今回の探索フェイズのリミットは4サイクルと告げて下さい。

▽「最後に、これは僕のへそくりだ。子供たちには、内緒だよ」

サ○マドロップの缶をくれます。これは【嗜好品】1つとして扱います。

嗜好品を渡したら、PCたちの行動の処理に移って下さい。

##### 【嗜好品】 { .item }

## 探索フェイズ

### 都有公園 {.checkpoint .A}
#### 描写
森の中に、広場があります。誰も乗っていないブランコに蔦がからみつき、 砂場だった所にはは小さな草が青々と茂っています。

#### 戦闘 { .battle }

茂みから飛び出してきたツノウサギ3体と戦闘になります。

戦闘が終わったら、行動の処理に移ります。 オブジェクトとして「公園」があることを伝え、都有公園探索表をプレイヤーにみせてください。


#### 都有公園 {.search}
##### 《探索/技術3》 {.roll}
《探索/技術3》に成功すると、都有公園探索表を振りアイテムを入手できます。 判定に失敗した場合、都有公園探索失敗表をふります。

##### 公園探索表 {.table}

d6|アイテム|説明
--|--|--
1|バット|野球用の金属バットです。「棍棒」として扱います。
2|コカの葉|砂場に生えています。アイテムリスト参照
3|アップルチェリー|林檎サイズのさくらんぼです。割込みで使用すると１点【気力】が増加します(1J、1W)
4|アップルチェリー|同上
5|うさぎ|1Jとして扱います。
6|うさぎ|同上

##### 公園探索失敗表 {.table}

d6|イベント
--|--
1|草むらから突然ツノウサギが！ ツノウサギ3体と戦闘になります。1ラウンド目は 先制判定が行えず、冒険者たちは全員後攻となります。
2|錆びた蛇口を捻っても何もでませんでした。
3|壊れたベンチが大樹の上にひっかかっています。
4|何も見つからず疲れました。【体力】が1点減少します。0以下にはなりません。
5|うさぎに逃げられました
6|ハトのふんが当たりました。

#### 崩れたトンネル {.lock}
トンネルが崩れています。瓦礫をどかさなくては進めません。

##### 《掴む／腕部：7》 {.roll}

##### コンビニへ {.path}

※移動
障害を突破し、次のチェックポイントへ移るときには ランダムエンカウント表を振ります。

### コンビニ跡
#### 描写
コンビニだった建物があります。棚が倒れて、ガラスは割れています。
また、コンビニの向こうに川が流れています。これは「水場：リミット増加用オブジェクト」とします。
「コンビニ」もオブジェクトです。コンビニ探索表をプレイヤーにみせてください。

オブジェクト：コンビニ
《探索/技術3》に成功すると、コンビニ探索表を振りアイテムを入手できます。 判定に失敗した場合、コンビニ探索失敗表をふります。
`}</pre>
      </Box>

      <Link href="/lostrpg">{t['common_back']}</Link>
    </Container>
  )
}

export async function getStaticProps({ params }) {
  const { default: lngDict = {} } = await import(`~/locales/${params.lng}.json`)

  return {
    props: { lng: params.lng, lngDict },
  }
}

export async function getStaticPaths() {
  return {
    paths: languages.map((l) => ({ params: { lng: l } })),
    fallback: false,
  }
}

export default Page
