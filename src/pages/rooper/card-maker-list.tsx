import Head from 'next/head'
import React, { useState, useRef, useEffect } from 'react'
import { NextPage } from 'next'
import { Button } from '@material-ui/core'
import ImageArea from '~/components/organisms/rooper/list/ImageInputArea'
// import InputArea from '~/components/organisms/rooper/InputArea'
import Footer from '~/components/organisms/common/Footer'
import { MyJSX, MyGlobalJSX } from '../trpg-manual'

import { createZip } from '~/lib/rooper/udonarium'
const characters = [
  'boy',
  'girl',
  'rmd',
  'shr',
  'kg',
  'off',
  'info',
  'doc',
  'pat',
  'rep',
  'mys',
  'ali',
  'god',
  'idol',
  'jou',
  'boss',
  'nurse',
  'hen',
  'gak',
  'ill',
  'fore',
  'ai',
  'tea',
  'new',
  'mil',
  'cat',
  'lit',
]

const Home: NextPage = () => {
  const [exportList, setList] = useState([])
  const addList = (name: string, canvas: any) => {
    if (exportList.findIndex((el) => el.name === name) !== -1) {
      return
    }

    setList([...exportList, { name, canvas }])
    console.log(exportList)
    // canvas.toBlob((blob) => {
    //   onFileChange(blob)
    // })
  }
  const downloadZip = () => {
    createZip(exportList)
  }

  return (
    <div className="container">
      <Head>
        <title>惨劇RoopeR カードメイカー</title>
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.13.0/css/all.css"
          integrity="sha384-Bfad6CLCknfcloXFOyFnlgtENryhrpZCe29RTifKEixXQZ38WheV+i/6YWSzkz3V"
          crossOrigin="anonymous"
        />
      </Head>
      <main>
        <h1>惨劇RoopeR オリジナルカードメイカー</h1>
        <p>
          画像をドラッグ＆ドロップで惨劇RoopeR風のカードが作成できます。画像サイズは620×866です。
          <br></br>
          作成した画像はユドナリウムで使えるZIPが下のボタンからダウンロードできます。
          <a
            style={{ textDecoration: 'underline' }}
            href="https://rooper-401ef.web.app/"
          >
            惨劇Udonarium
          </a>
          にお使いください。<br></br>画像を設定したカードのみzipに保存されます。
        </p>
        <p>
          <Button variant="contained" color="primary" onClick={downloadZip}>
            ZIPダウンロード
          </Button>
        </p>
        <p>
          <a
            style={{ textDecoration: 'underline' }}
            href="http://bakafire.main.jp/rooper/sr_top.htm"
          >
            惨劇コモンズχ作成:BakaFire様、紺ノ玲様
          </a>
          。
          {/*参考： <a
            style={{ textDecoration: 'underline' }}
            href="https://yoshis-island.net/udonarium/#/deck-editor"
          >
            ユドナリウム用カードデッキエディター
          </a> */}
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '800px' }}>
          {characters.map((name) => (
            <ImageArea
              key={name}
              defChara={name}
              onFileChange={(canvas) => {
                // console.log(blob)
                // const identifier = await calcSHA256Async(blob)
                addList(name, canvas)

                // files.push(
                //   new File([blob], identifier + '.' + MimeType.extension(blob.type), {
                //     type: blob.type,
                //   }),
                // )
              }}
            />
          ))}
        </div>
      </main>
      <Footer />
      <MyJSX />
      <MyGlobalJSX />
    </div>
  )
}

export default Home
