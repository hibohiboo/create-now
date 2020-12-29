import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'

const Page: NextPage = () => {
  const url = '/third/udonarium/index.html'
  const [config, setConfig] = useState({
    is2d: true,
    useKeyboardHelp: true,
    useCardTap: true,
    useSpreadsheet: true,
    useDecksheet: true,
    spreadSheetId: '1JVa25s339f4kNXhdgHXI4dVq3FGMHrT8x7ZvhXKRDMY',
    deckSheetId: '1sOYvbR4SXlw3H3a2tL2A8Q8PJqad0hbRV6QpwSa-wIg',
    hideSample: false,

    useLilyBuff: true,
    useLilyCutin: true,
    useLilyRemocon: true,
    useLilyFile: true,
    useLilyDiceTable: true,
    useLilyStand: true,
    useLilyTalkFlg: true,
    useLilyHideInventoryFlg: true,
  })
  const customUrl = () =>
    `${url}?q=1${config.is2d ? '&2d=true' : ''}${
      config.useKeyboardHelp ? '&keyboardHelp=true' : ''
    }${config.useCardTap ? '&cardTap=true' : ''}${
      config.useSpreadsheet && config.spreadSheetId
        ? '&ss_auto=false&spreadsheet=' + config.spreadSheetId
        : ''
    }${
      config.useDecksheet && config.deckSheetId
        ? '&decksheet=' + config.deckSheetId
        : ''
    }${config.hideSample ? '&hide_sample=true' : ''}${
      config.useLilyCutin ? '&lily_cutin=true' : ''
    }
    ${config.useLilyStand ? '&lily_stand=true' : ''}
    ${config.useLilyDiceTable ? '&lily_dacetable=true' : ''}
    ${config.useLilyFile ? '&lily_file=true' : ''}
    ${config.useLilyBuff ? '&lily_buff=true' : ''}
    ${config.useLilyRemocon ? '&lily_remocon=true' : ''}
    ${config.useLilyTalkFlg ? '&lily_talk_flg=true' : ''}
    ${config.useLilyHideInventoryFlg ? '&lily_hide_inventory_flg=true' : ''}`
  return (
    <div className="container">
      <Head>
        <title>ユドナリウム Plus</title>
      </Head>
      <main style={{ paddingLeft: '10px' }}>
        <h1>ユドナリウム設定ページ</h1>
        <p>
          <a href="https://cylinder-lily.com/">ユドナリウム リリィ</a>
          を改造してます。
        </p>
        <p>
          バグ方向・ご要望は
          <a href="https://twitter.com/hibohiboo">hibohiboo</a>
          まで。
        </p>
        <div>
          <h3>ユドナリウム 機能追加</h3>
          <table>
            <thead>
              <tr>
                <td>設定</td>
                <td>説明</td>
                <td>スプレッドシートID</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.is2d}
                    onChange={(e) =>
                      setConfig({ ...config, is2d: e.target.checked })
                    }
                  ></input>
                </td>
                <td>2D表示</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useKeyboardHelp}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useKeyboardHelp: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>キーボードヘルプを表示</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardTap}
                    onChange={(e) =>
                      setConfig({ ...config, useCardTap: e.target.checked })
                    }
                  ></input>
                </td>
                <td>カードタップ機能追加</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.hideSample}
                    onChange={(e) =>
                      setConfig({ ...config, hideSample: e.target.checked })
                    }
                  ></input>
                </td>
                <td>サンプル非表示</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useSpreadsheet}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useSpreadsheet: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>スプレッドシートにログを記録</td>
                <td>
                  <input
                    value={config.spreadSheetId}
                    onChange={(e) =>
                      setConfig({ ...config, spreadSheetId: e.target.value })
                    }
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useDecksheet}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useDecksheet: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>スプレッドシートからカードデッキを記録</td>
                <td>
                  <input
                    value={config.deckSheetId}
                    onChange={(e) =>
                      setConfig({ ...config, deckSheetId: e.target.value })
                    }
                  ></input>
                </td>
              </tr>
            </tbody>
          </table>
          <h3>ユドナリウム リリィ</h3>
          <table>
            <thead>
              <tr>
                <td>設定</td>
                <td>説明</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyBuff}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyBuff: e.target.checked })
                    }
                  ></input>
                </td>
                <td>バフ表示</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyCutin}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyCutin: e.target.checked })
                    }
                  ></input>
                </td>
                <td>カットイン</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyRemocon}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyRemocon: e.target.checked })
                    }
                  ></input>
                </td>
                <td>カウンターリモコン</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyFile}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyFile: e.target.checked })
                    }
                  ></input>
                </td>
                <td>画像タグ</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyDiceTable}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyDiceTable: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>ダイス表</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyStand}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyStand: e.target.checked })
                    }
                  ></input>
                </td>
                <td>立ち絵</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyTalkFlg}
                    onChange={(e) =>
                      setConfig({ ...config, useLilyTalkFlg: e.target.checked })
                    }
                  ></input>
                </td>
                <td>会話非表示フラグ</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyHideInventoryFlg}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyHideInventoryFlg: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>インベントリ非表示フラグ</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>
              <a href={customUrl()}>設定を反映してユドナリウムに移動する</a>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
