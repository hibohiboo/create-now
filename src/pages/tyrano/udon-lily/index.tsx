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
    useShortcut: true,
    useCardOnTopMove: true,

    useLilyBuff: true,
    useLilyCutin: true,
    useLilyRemocon: true,
    useLilyFile: true,
    useLilyDiceTable: true,
    useLilyStand: true,
    useLilyTalkFlg: true,
    useLilyHideInventoryFlg: true,

    useWithFlyPlayerColor: true,
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
      config.useShortcut ? '&keyboard_shortcut=true' : ''
    }${config.useCardOnTopMove ? '&ontopcardmove=true' : ''}${
      config.useLilyCutin ? '&lily_cutin=true' : ''
    }${config.useLilyStand ? '&lily_stand=true' : ''}${
      config.useLilyDiceTable ? '&lily_dacetable=true' : ''
    }${config.useLilyFile ? '&lily_file=true' : ''}${
      config.useLilyBuff ? '&lily_buff=true' : ''
    }${config.useLilyRemocon ? '&lily_remocon=true' : ''}${
      config.useLilyTalkFlg ? '&lily_talk_flg=true' : ''
    }${config.useLilyHideInventoryFlg ? '&lily_hide_inventory_flg=true' : ''}${
      config.useWithFlyPlayerColor ? 'withfly_player_color=true' : ''
    }`
  return (
    <div className="container">
      <Head>
        <title>ユドナリウム Plus</title>
      </Head>
      <main style={{ paddingLeft: '10px' }}>
        <h1>ユドナリウム設定ページ</h1>
        <p>
          <a href="https://cylinder-lily.com/" target="_blank" rel="noreferrer">
            ユドナリウム リリィ
          </a>
          と
          <a
            href="https://github.com/NanasuNANA/UdonariumWithFly"
            target="_blank"
            rel="noreferrer"
          >
            ユドナリウム with Fly
          </a>
          を改造してます。
        </p>

        <p>
          機能を選択して使用できます。リリィから未移植の機能もあるので、そちらが使いたい場合は本家リリィをご利用ください。
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
                    checked={config.useShortcut}
                    onChange={(e) =>
                      setConfig({ ...config, useShortcut: e.target.checked })
                    }
                  ></input>
                </td>
                <td>キーボードショートカット追加</td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardOnTopMove}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useCardOnTopMove: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>重ねカード移動機能追加</td>
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
              <tr>
                <td>
                  <input type="checkbox" disabled={true} />
                </td>
                <td>キャラシート詳細横幅調整機能※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true} />
                </td>
                <td>共有メモ高さ調整機能※未移植</td>
              </tr>
            </tbody>
          </table>

          <h3>Udonarium with Fly</h3>
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
                    checked={config.useWithFlyPlayerColor}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyPlayerColor: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>プレイヤーカラー</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>ダイス一斉公開※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>視点リセット※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>参照URLを開く※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>カードをn枚引く※未移植</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>高さのグリッド※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>スタンド※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>顔アイコン※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>画像切替※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>画像の影切替※未移植</td>
              </tr>

              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>画像効果・逆※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>画像効果・ぼかし※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>画像効果・黒塗り※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>高度・共有メモ※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>高度・キャラクター※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>高度・地形※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>高度・ダイス※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>影を落とす※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>地形・傾斜※未移植</td>
              </tr>
            </tbody>
          </table>
          <div>
            <p>
              <a href={customUrl()}>設定を反映してユドナリウムに移動する</a>
            </p>
          </div>
          <div>
            <h2>設定補足</h2>
            <h3 id="is2d">2D表示</h3>
            <img src="/images/udon/2d.png" width="400px" />
            <h3 id="keyboard-help">キーボードヘルプを表示</h3>
            <p>「ctrl+?」キーでヘルプを表示します</p>
            <img src="/images/udon/keyboard-help.png" width="400px" />
            <h3 id="catd-tap">カードタップ</h3>
            <p>
              カードの上で「t」キーでカードを横に倒します。「u」キーでカードを縦にします。
            </p>
            <h3 id="keyboard-shortcut">キーボードショートカット追加</h3>
            <p>
              キャラクターをクリックした後に[c]キーでコピーなどできます。詳細はキーボードヘルプを表示してご確認お願いします。
            </p>
            <h3 id="keyboard-shortcut">重ねカード移動機能追加</h3>
            <p>
              カードが重なっているとき、下になっているカードを移動させると上のカードも同様に移動されます。
            </p>
            <h3 id="keyboard-help">スプレッドシートにログを記録</h3>
            <p>
              スプレッドシート連携ボタンを押して、認証を行う必要があります。入力したIDのシートにログが保存されます。
            </p>
            <img src="/images/udon/spread-sheet-login.png" width="400px" />
            <p>スプレッドシートIDは、URLの以下の部分で取得できます。</p>
            <p>
              <a
                href="https://docs.google.com/spreadsheets/d/1JVa25s339f4kNXhdgHXI4dVq3FGMHrT8x7ZvhXKRDMY/"
                target="_blank"
                rel="noreferrer"
              >
                ログ保存サンプルシート
              </a>
            </p>
            <img src="/images/udon/spread-sheet-id.png" width="600px" />
            <h3 id="keyboard-help"> スプレッドシートからカードデッキを記録</h3>
            <p>
              スプレッドシートにカード情報を記述して、デッキを作ることができます。
              デッキは右クリックからトランプのように配置できます。
            </p>
            <p>
              <a
                href="https://docs.google.com/spreadsheets/d/1sOYvbR4SXlw3H3a2tL2A8Q8PJqad0hbRV6QpwSa-wIg/"
                target="_blank"
                rel="noreferrer"
              >
                カードデッキサンプルシート
              </a>
            </p>
            <img src="/images/udon/spread-sheet-deck.png" width="400px" />
            <h3 id="conter-remocon">カウンターリモコン</h3>
            <p>キャラクターを右クリックして、リモコンを選択できます。</p>
            <img src="/images/udon/lily-remocon-menu.png" width="300px" />
            <p>
              右側のリストから選択したキャラに対して、一括でHPの操作などができます。
              「リモコン操作」ボタンで実行します。
            </p>
            <img src="/images/udon/lily-remocon-sample.png" width="600px" />
            <h3 id="lily-buff">バフ表示</h3>
            <p>リモコンからバフを設定できます。</p>
            <img src="/images/udon/lily-remocon-buff.png" width="600px" />
            <h3 id="lily-cutin">カットイン</h3>
            <p>カットインを設定できます。</p>
            <img src="/images/udon/lily-cutin.png" width="600px" />
            <h3 id="lily-dicetable">ダイス表</h3>
            <p>
              ダイス表を設定できます。ダイス表の「コマンド」をチャットに入れることで、表を振ることができます。
            </p>
            <p>
              以下の画像の例だと、「SAMPLE」がチャット欄に打ち込む文字列になります。
            </p>
            <img src="/images/udon/lily-dicetable.png" width="600px" />
            <h3 id="lily-tag">画像タグ</h3>
            <p>
              画像にタグを設定できます。タグを打ち込んで、チェックを入れて「タグを変更」ボタンです。
            </p>
            <img src="/images/udon/lily-tag.png" width="400px" />
            <p>タグで検索をすることができます。</p>
            <img src="/images/udon/lily-tag-search.png" width="400px" />
            <h3 id="lily-talk-flg">会話非表示フラグ</h3>
            <p>
              「発言をしない」にチェックを入れると、チャット欄に名前が表示されなくなります。{' '}
            </p>
            <img src="/images/udon/lily-talk-flg.png" width="600px" />
            <h3 id="lily-hide-inventory">インベントリ非表示フラグ</h3>
            <p>
              「テーブルインベントリ非表示」にチェックを入れると、インベントリに表示されなくなります。{' '}
            </p>
            <img src="/images/udon/lily-hide-inventory.png" width="600px" />
            <h3 id="with-fly-player-coloer">プレイヤーカラー</h3>
            <p>
              プレイヤーの色を設定できます。色は自分のチャットの名前、手札にしたカード、自分のダイスに反映されます。
            </p>
            <img src="/images/udon/with-fly-player-color.png" width="600px" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page
