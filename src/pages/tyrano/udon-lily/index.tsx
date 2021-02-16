import { NextPage } from 'next'
import Head from 'next/head'
import React, { useState } from 'react'
const defaultConfig = {
  is2d: true,
  useKeyboardHelp: true,
  useCardTap: true,
  useSpreadsheet: false,
  useDecksheet: false,
  spreadSheetId: '1JVa25s339f4kNXhdgHXI4dVq3FGMHrT8x7ZvhXKRDMY',
  deckSheetId: '1sOYvbR4SXlw3H3a2tL2A8Q8PJqad0hbRV6QpwSa-wIg',
  hideSample: false,
  useShortcut: true,
  useCardOnTopMove: true,
  useHandStorage: true,
  useDicebot: true,
  diceBotId: 'DoubleCross',
  useCardOnlySelfHide: true,
  useCardGMView: true,

  useLilyBuff: true,
  useLilyCutin: true,
  useLilyRemocon: true,
  useLilyFile: true,
  useLilyDiceTable: true,
  useLilyStand: true,
  useLilyTalkFlg: true,
  useLilyHideInventoryFlg: true,
  useLilyMessgeColor: true,

  useWithFlyPlayerColor: true,
  useWithFlyResetPoint: true,
  useWithFlyDiceAllOpen: true,
  useWithFlyCardNdraw: true,
  useWithFlyGridHeight: true,
  useWithFlyOpenUrl: true,
  useWithFlyContextMenuHeightTerrain: true,
  useLilyUdonariumLog: true,
  useLilyDeleteLog: true,
}

const allFalse = (() => {
  const tmp = { ...defaultConfig }
  for (const i in tmp) {
    if (tmp[i] === true) tmp[i] = false
  }
  return tmp
})()
const Page: NextPage = () => {
  const url = '/third/udonarium/index.html'
  const [config, setConfig] = useState(defaultConfig)

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
      config.useWithFlyPlayerColor ? '&withfly_player_color=true' : ''
    }${config.useHandStorage ? '&hand_storage=true' : ''}${
      config.useLilyMessgeColor ? '&lily_message_color=true' : ''
    }${config.useDicebot ? `&use_dicebot=${config.diceBotId}` : ''}${
      config.useWithFlyResetPoint ? '&withfly_reset_point=true' : ''
    }${config.useWithFlyDiceAllOpen ? '&withfly_dice_all_open=true' : ''}${
      config.useWithFlyCardNdraw ? '&withfly_card_n_draw=true' : ''
    }${config.useWithFlyGridHeight ? '&withfly_grid_height=true' : ''}${
      config.useWithFlyOpenUrl ? '&withfly_open_url=true' : ''
    }${
      config.useWithFlyContextMenuHeightTerrain
        ? '&withfly_context_menu_height=true'
        : ''
    }${config.useCardOnlySelfHide ? '&use_card_only_self_hide=true' : ''}${
      config.useCardGMView ? '&use_card_gm_view=true' : ''
    }${config.useLilyUdonariumLog ? '&lily_udonarium_log=true' : ''}${
      config.useLilyDeleteLog ? '&lily_delete_log=true' : ''
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
          機能を選択して使用できます。未移植の機能もあるので、そちらが使いたい場合は本家をご利用ください。
        </p>
        <p>
          バグ方向・ご要望は
          <a href="https://twitter.com/hibohiboo">hibohiboo</a>
          まで。
        </p>
        <div>
          <h3>ユドナリウム 機能追加</h3>
          <button
            onClick={() => {
              setConfig(allFalse)
            }}
          >
            チェックを全て外す
          </button>
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
                    id="is2d"
                    onChange={(e) =>
                      setConfig({ ...config, is2d: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="is2d">2D表示</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useKeyboardHelp}
                    id="useKeyboardHelp"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useKeyboardHelp: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useKeyboardHelp">
                    キーボードヘルプを表示
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardTap}
                    id="useCardTap"
                    onChange={(e) =>
                      setConfig({ ...config, useCardTap: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useCardTap">カードタップ機能追加</label>{' '}
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.hideSample}
                    id="hideSample"
                    onChange={(e) =>
                      setConfig({ ...config, hideSample: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="hideSample">サンプル非表示</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useShortcut}
                    id="useShortcut"
                    onChange={(e) =>
                      setConfig({ ...config, useShortcut: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useShortcut">
                    キーボードショートカット追加
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardOnTopMove}
                    id="useCardOnTopMove"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useCardOnTopMove: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useCardOnTopMove">
                    重ねカード移動機能追加
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useHandStorage}
                    id="useHandStorage"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useHandStorage: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useHandStorage">手札置き場追加</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useSpreadsheet}
                    id="useSpreadsheet"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useSpreadsheet: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useSpreadsheet">
                    スプレッドシートにログを記録
                  </label>
                </td>
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
                    id="useDecksheet"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useDecksheet: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useDecksheet">
                    スプレッドシートからカードデッキを記録
                  </label>
                </td>
                <td>
                  <input
                    value={config.deckSheetId}
                    onChange={(e) =>
                      setConfig({ ...config, deckSheetId: e.target.value })
                    }
                  ></input>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useDicebot}
                    id="useDicebot"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useDicebot: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useDicebot">既定のダイスボットを指定</label>
                </td>
                <td>
                  <select
                    value={config.diceBotId}
                    onChange={(e) =>
                      setConfig({ ...config, diceBotId: e.target.value })
                    }
                  >
                    {dicebotInfos.map((item) => (
                      <option key={item.script} value={item.script}>
                        {item.game}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardOnlySelfHide}
                    id="useCardOnlySelfHide"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useCardOnlySelfHide: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useCardOnlySelfHide">
                    裏カードのメニューに「自分だけ隠す」を追加
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useCardGMView}
                    id="useCardGMView"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useCardGMView: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useCardGMView">
                    カードのメニューに「全ての裏カードを見る」を追加
                  </label>{' '}
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
                    id="useLilyRemocon"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyRemocon: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyRemocon">カウンターリモコン</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyBuff}
                    id="useLilyBuff"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyBuff: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyBuff">バフ表示</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyCutin}
                    id="useLilyCutin"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyCutin: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyCutin">カットイン</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyFile}
                    id="useLilyFile"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyFile: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyFile">画像タグ</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyDiceTable}
                    id="useLilyDiceTable"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyDiceTable: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyDiceTable">ダイス表</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyStand}
                    id="useLilyStand"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyStand: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyStand">立ち絵</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyTalkFlg}
                    id="useLilyTalkFlg"
                    onChange={(e) =>
                      setConfig({ ...config, useLilyTalkFlg: e.target.checked })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyTalkFlg">会話非表示フラグ</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyHideInventoryFlg}
                    id="useLilyHideInventoryFlg"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyHideInventoryFlg: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyHideInventoryFlg">
                    インベントリ非表示フラグ
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyUdonariumLog}
                    id="useLilyUdonariumLog"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyUdonariumLog: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyUdonariumLog">
                    どどんとふ風ログ出力
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyDeleteLog}
                    id="useLilyDeleteLog"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyDeleteLog: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyDeleteLog">ログ削除</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useLilyMessgeColor}
                    id="useLilyMessgeColor"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useLilyMessgeColor: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useLilyMessgeColor">
                    チャットメッセージ色設定
                  </label>
                </td>
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
                    id="useWithFlyPlayerColor"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyPlayerColor: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyPlayerColor">
                    プレイヤーカラー
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyResetPoint}
                    id="useWithFlyResetPoint"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyResetPoint: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyResetPoint">視点リセット</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyDiceAllOpen}
                    id="useWithFlyDiceAllOpen"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyDiceAllOpen: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyDiceAllOpen">ダイス一斉公開</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyCardNdraw}
                    id="useWithFlyCardNdraw"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyCardNdraw: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyCardNdraw">カードをn枚引く</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyGridHeight}
                    id="useWithFlyGridHeight"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyGridHeight: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyGridHeight">高さのグリッド</label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyOpenUrl}
                    id="useWithFlyOpenUrl"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyOpenUrl: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyOpenUrl">
                    参照URLを開く(キャラクターのみ移植)
                  </label>
                </td>
              </tr>
              <tr>
                <td>
                  <input
                    type="checkbox"
                    checked={config.useWithFlyContextMenuHeightTerrain}
                    id="useWithFlyContextMenuHeightTerrain"
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        useWithFlyContextMenuHeightTerrain: e.target.checked,
                      })
                    }
                  ></input>
                </td>
                <td>
                  <label htmlFor="useWithFlyContextMenuHeightTerrain">
                    高度・地形
                  </label>
                </td>
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
                <td>キャラクター吹き出し※未移植</td>
              </tr>
              <tr>
                <td>
                  <input type="checkbox" disabled={true}></input>
                </td>
                <td>エモートチャットバルーン※未移植</td>
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
            <h3 id="use-dicebot">既定のダイスボットを指定</h3>
            <img src="/images/udon/use-dicebot.jpg" width="600px" />

            <h3 id="use-dicebot">裏カードのメニューに「自分だけ隠す」を追加</h3>
            <p>インディアンポーカーができます。</p>
            <img src="/images/udon/hide-only-self.png" width="600px" />
            <h3 id="use-dicebot">
              カードのメニューに「全ての裏カードを見る」を追加
            </h3>
            <p>インセインでGMが全ての狂気カードを把握しておきたい時などに。</p>
            <p>
              設定の反映に10秒くらいかかることがあります。他のカードを動かしたりして、少しまったりしていてください。
            </p>

            <img src="/images/udon/card-gm-view.png" width="600px" />

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
            <h3 id="lily-stand">立ち絵</h3>
            <p>
              立ち絵を設定できます。複数設定して切り替えることができます。キャラコマを右クリックして「詳細を表示」「編集切替」imageの左の「＋」ボタンで追加できます。
            </p>
            <img src="/images/udon/lily-stand.gif" width="600px" />
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
            <h3 id="lily-dodontof-log">どどんとふ風ログ出力</h3>
            <p>どどんとふ風ログとしてHTMLファイルを出力します。</p>
            <img src="/images/udon/lily-dodontof-log.png" width="600px" />
            <h3 id="lily-log-delete">ログ削除</h3>
            <p>ログの削除を行います。</p>
            <img src="/images/udon/lily-log-delete.png" width="600px" />

            <h3 id="with-fly-player-coloer">チャットメッセージ色設定</h3>
            <p>
              メッセージの色を設定できます。丸くなっているのが選択中の色です。3色まで設定して切り替えられrます。
            </p>
            <img src="/images/udon/lily-chatcolor.png" width="400px" />

            <h3 id="with-fly-player-coloer">プレイヤーカラー</h3>
            <p>
              プレイヤーの色を設定できます。色は自分のチャットの名前、手札にしたカード、自分のダイスに反映されます。
            </p>
            <img src="/images/udon/with-fly-player-color.png" width="600px" />
            <h3 id="with-fly-open-url">参照URLを開く</h3>
            <p>
              <a
                href="https://udontools.netlify.app/#/charazip"
                target="_blank"
                rel="noreferrer"
              >
                ユドナリウムのキャラコマを作るやつ
              </a>
              で作ったコマの右クリックメニューにキャラクターシートへのリンクを設定します。
            </p>
            <img src="/images/udon/with-fly-open-url-menu.png" width="400px" />
            <p>URLをクリックすると、確認モーダルが表示されます。</p>
            <img src="/images/udon/with-fly-open-url-modal.png" width="600px" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Page

const dicebotInfos = [
  { script: 'EarthDawn', game: 'アースドーン' },
  { script: 'EarthDawn3', game: 'アースドーン3版' },
  { script: 'EarthDawn4', game: 'アースドーン4版' },
  { script: 'Airgetlamh', game: '朱の孤塔のエアゲトラム' },
  { script: 'AFF2e', game: 'ADVANCED FIGHTING FANTASY 2nd Edition' },
  { script: 'AnimaAnimus', game: 'アニマアニムス' },
  { script: 'Amadeus', game: 'アマデウス' },
  { script: 'Arianrhod', game: 'アリアンロッドRPG' },
  { script: 'OrgaRain', game: '在りて遍くオルガレイン' },
  { script: 'Alshard', game: 'アルシャード' },
  { script: 'ArsMagica', game: 'アルスマギカ' },
  { script: 'AlterRaise', game: 'アルトレイズ' },
  { script: 'IthaWenUa', game: 'イサー・ウェン＝アー' },
  { script: 'YearZeroEngine', game: 'YearZeroEngine' },
  { script: 'Insane', game: 'インセイン' },
  {
    script: 'VampireTheMasquerade5th',
    game: 'Vampire: The Masquerade 5th Edition',
  },
  { script: 'WitchQuest', game: 'ウィッチクエスト' },
  { script: 'Warhammer', game: 'ウォーハンマー' },
  { script: 'Utakaze', game: 'ウタカゼ' },
  { script: 'Alsetto', game: '詩片のアルセット' },
  { script: 'AceKillerGene', game: 'エースキラージーン' },
  { script: 'EclipsePhase', game: 'エクリプス・フェイズ' },
  { script: 'EmbryoMachine', game: 'エムブリオマシンRPG' },
  { script: 'Elysion', game: 'エリュシオン' },
  { script: 'Elric', game: 'エルリック！' },
  { script: 'EndBreaker', game: 'エンドブレイカー！' },
  { script: 'Oukahoushin3rd', game: '央華封神RPG 第三版' },
  { script: 'OracleEngine', game: 'オラクルエンジン' },
  { script: 'GardenOrder', game: 'ガーデンオーダー' },
  { script: 'CardRanker', game: 'カードランカー' },
  { script: 'Gurps', game: 'ガープス' },
  { script: 'GurpsFW', game: 'ガープスフィルトウィズ' },
  { script: 'ChaosFlare', game: 'カオスフレア' },
  { script: 'OneWayHeroics', game: '片道勇者TRPG' },
  { script: 'Kamigakari', game: '神我狩' },
  { script: 'Garako', game: 'ガラコと破界の塔' },
  { script: 'KanColle', game: '艦これRPG' },
  { script: 'Gundog', game: 'ガンドッグ' },
  { script: 'GundogZero', game: 'ガンドッグゼロ' },
  { script: 'GundogRevised', game: 'ガンドッグ・リヴァイズド' },
  { script: 'KillDeathBusiness', game: 'キルデスビジネス' },
  { script: 'StellarKnights', game: '銀剣のステラナイツ' },
  { script: 'Cthulhu', game: 'クトゥルフ神話TRPG' },
  { script: 'CthulhuTech', game: 'クトゥルフテック' },
  { script: 'KurayamiCrying', game: 'クラヤミクライン' },
  { script: 'GranCrest', game: 'グランクレストRPG' },
  { script: 'GeishaGirlwithKatana', game: 'ゲイシャ・ガール・ウィズ・カタナ' },
  { script: 'GehennaAn', game: 'ゲヘナ・アナスタシス' },
  { script: 'KemonoNoMori', game: '獸ノ森' },
  { script: 'StrangerOfSwordCity', game: '剣の街の異邦人TRPG' },
  { script: 'Illusio', game: '晃天のイルージオ' },
  { script: 'CodeLayerd', game: 'コード：レイヤード' },
  { script: 'Avandner', game: '黒絢のアヴァンドナー' },
  { script: 'GoblinSlayer', game: 'ゴブリンスレイヤーTRPG' },
  { script: 'Gorilla', game: 'ゴリラTRPG' },
  { script: 'ColossalHunter', game: 'コロッサルハンター' },
  { script: 'Postman', game: '壊れた世界のポストマン' },
  { script: 'Satasupe', game: 'サタスペ' },
  { script: 'SamsaraBallad', game: 'サンサーラ・バラッド' },
  { script: 'SharedFantasia', game: 'Shared†Fantasia' },
  { script: 'JamesBond', game: 'ジェームズ・ボンド007' },
  { script: 'LiveraDoll', game: '紫縞のリヴラドール' },
  { script: 'ShinobiGami', game: 'シノビガミ' },
  { script: 'ShadowRun', game: 'シャドウラン' },
  { script: 'ShadowRun4', game: 'シャドウラン 4th Edition' },
  { script: 'ShadowRun5', game: 'シャドウラン 5th Edition' },
  { script: 'ShoujoTenrankai', game: '少女展爛会TRPG' },
  { script: 'ShinkuuGakuen', game: '真空学園' },
  { script: 'Cthulhu7th', game: '新クトゥルフ神話TRPG' },
  { script: 'ShinMegamiTenseiKakuseihen', game: '真・女神転生TRPG 覚醒篇' },
  { script: 'Skynauts', game: '歯車の塔の探空士' },
  { script: 'ScreamHighSchool', game: 'スクリームハイスクール' },
  { script: 'SRS', game: 'スタンダードRPGシステム' },
  { script: 'SteamPunkers', game: 'スチームパンカーズ' },
  { script: 'SterileLife', game: 'ステラーライフTRPG' },
  { script: 'StratoShout', game: 'ストラトシャウト' },
  { script: 'EtrianOdysseySRS', game: '世界樹の迷宮SRS' },
  { script: 'ZettaiReido', game: '絶対隷奴' },
  { script: 'SevenFortressMobius', game: 'セブン＝フォートレス メビウス' },
  { script: 'TherapieSein', game: 'セラフィザイン' },
  { script: 'Villaciel', game: '蒼天のヴィラシエル' },
  { script: 'SwordWorld', game: 'ソードワールドRPG' },
  { script: 'SwordWorld2_0', game: 'ソードワールド2.0' },
  { script: 'SwordWorld2_5', game: 'ソードワールド2.5' },
  { script: 'DarkSouls', game: 'ダークソウルTRPG' },
  { script: 'DarkDaysDrive', game: 'ダークデイズドライブ' },
  { script: 'DarkBlaze', game: 'ダークブレイズ' },
  { script: 'DiceOfTheDead', game: 'ダイス・オブ・ザ・デッド' },
  { script: 'DoubleCross', game: 'ダブルクロス2nd,3rd' },
  { script: 'DungeonsAndDragons', game: 'ダンジョンズ＆ドラゴンズ' },
  { script: 'Paradiso', game: 'チェレステ色のパラディーゾ' },
  { script: 'Chill', game: 'Chill' },
  { script: 'Chill3', game: 'Chill 3rd Edition' },
  { script: 'CrashWorld', game: '墜落世界' },
  { script: 'DetatokoSaga', game: 'でたとこサーガ' },
  { script: 'DeadlineHeroes', game: 'デッドラインヒーローズRPG' },
  { script: 'DemonParasite', game: 'デモンパラサイト' },
  { script: 'TokyoGhostResearch', game: '東京ゴーストリサーチ' },
  { script: 'TokyoNova', game: 'トーキョーN◎VA' },
  { script: 'Torg', game: 'トーグ' },
  { script: 'Torg1_5', game: 'トーグ1.5版' },
  { script: 'TorgEternity', game: 'TORG Eternity' },
  { script: 'TokumeiTenkousei', game: '特命転攻生' },
  { script: 'Dracurouge', game: 'ドラクルージュ' },
  { script: 'TrinitySeven', game: 'トリニティセブンRPG' },
  { script: 'TwilightGunsmoke', game: 'トワイライトガンスモーク' },
  { script: 'TunnelsAndTrolls', game: 'トンネルズ＆トロールズ' },
  { script: 'NightWizard', game: 'ナイトウィザード The 2nd Edition' },
  { script: 'NightWizard3rd', game: 'ナイトウィザード The 3rd Edition' },
  { script: 'NightmareHunterDeep', game: 'ナイトメアハンター=ディープ' },
  { script: 'NinjaSlayer', game: 'ニンジャスレイヤーTRPG' },
  { script: 'NjslyrBattle', game: 'NJSLYRBATTLE' },
  { script: 'Nuekagami', game: '鵺鏡' },
  { script: 'Nechronica', game: 'ネクロニカ' },
  { script: 'NeverCloud', game: 'ネバークラウドTRPG' },
  { script: 'HarnMaster', game: 'ハーンマスター' },
  { script: 'Pathfinder', game: 'Pathfinder' },
  { script: 'BadLife', game: 'バッドライフ' },
  { script: 'HatsuneMiku', game: '初音ミクTRPG ココロダンジョン' },
  { script: 'BattleTech', game: 'バトルテック' },
  { script: 'ParasiteBlood', game: 'パラサイトブラッドRPG' },
  { script: 'Paranoia', game: 'パラノイア' },
  { script: 'ParanoiaRebooted', game: 'パラノイア リブーテッド' },
  { script: 'BarnaKronika', game: 'バルナ・クロニカ' },
  { script: 'PulpCthulhu', game: 'パルプ・クトゥルフ' },
  { script: 'Raisondetre', game: '叛逆レゾンデートル' },
  { script: 'HuntersMoon', game: 'ハンターズ・ムーン' },
  { script: 'Peekaboo', game: 'ピーカーブー' },
  { script: 'BeastBindTrinity', game: 'ビーストバインド トリニティ' },
  { script: 'BBN', game: 'BBNTRPG' },
  { script: 'Hieizan', game: '比叡山炎上' },
  { script: 'BeginningIdol', game: 'ビギニングアイドル' },
  { script: 'PhantasmAdventure', game: 'ファンタズム・アドベンチャー' },
  { script: 'Fiasco', game: 'フィアスコ' },
  { script: 'FilledWith', game: 'フィルトウィズ' },
  { script: 'FutariSousa', game: 'フタリソウサ' },
  { script: 'BlindMythos', game: 'ブラインド・ミトスRPG' },
  { script: 'BloodCrusade', game: 'ブラッド・クルセイド' },
  { script: 'BloodMoon', game: 'ブラッド・ムーン' },
  { script: 'FullMetalPanic', game: 'フルメタル・パニック！RPG' },
  { script: 'BladeOfArcana', game: 'ブレイド・オブ・アルカナ' },
  { script: 'Strave', game: '碧空のストレイヴ' },
  { script: 'Pendragon', game: 'ペンドラゴン' },
  { script: 'HouraiGakuen', game: '蓬莱学園の冒険!!' },
  { script: 'MagicaLogia', game: 'マギカロギア' },
  { script: 'InfiniteFantasia', game: '無限のファンタジア' },
  { script: 'MeikyuKingdom', game: '迷宮キングダム' },
  { script: 'MeikyuKingdomBasic', game: '迷宮キングダム 基本ルールブック' },
  { script: 'MeikyuDays', game: '迷宮デイズ' },
  { script: 'MetallicGuardian', game: 'メタリックガーディアンRPG' },
  { script: 'MetalHead', game: 'メタルヘッド' },
  { script: 'MetalHeadExtream', game: 'メタルヘッドエクストリーム' },
  { script: 'MonotoneMuseum', game: 'モノトーンミュージアムRPG' },
  { script: 'YankeeYogSothoth', game: 'ヤンキー＆ヨグ＝ソトース' },
  { script: 'GoldenSkyStories', game: 'ゆうやけこやけ' },
  { script: 'Ryutama', game: 'りゅうたま' },
  { script: 'RyuTuber', game: 'リューチューバーとちいさな奇跡' },
  { script: 'RuneQuest', game: 'ルーンクエスト' },
  { script: 'RecordOfSteam', game: 'Record of Steam' },
  { script: 'RecordOfLodossWar', game: 'ロードス島戦記RPG' },
  { script: 'RoleMaster', game: 'ロールマスター' },
  { script: 'LogHorizon', game: 'ログ・ホライズンTRPG' },
  { script: 'RokumonSekai2', game: '六門世界RPG セカンドエディション' },
  { script: 'LostRecord', game: 'ロストレコード' },
  { script: 'LostRoyal', game: 'ロストロイヤル' },
  { script: 'WaresBlade', game: 'ワースブレイド' },
  { script: 'WARPS', game: 'ワープス' },
  { script: 'WorldOfDarkness', game: 'ワールド・オブ・ダークネス' },
  { script: 'Cthulhu7th_ChineseTraditional', game: '克蘇魯神話第7版' },
  { script: 'Cthulhu_ChineseTraditional', game: '克蘇魯神話' },
  { script: 'KillDeathBusiness_Korean', game: 'Kill Death Business (한국어)' },
  { script: 'Nechronica_Korean', game: '네크로니카' },
  { script: 'DoubleCross_Korean', game: '더블크로스2nd,3rd' },
  { script: 'DetatokoSaga_Korean', game: '데타토코 사가' },
  { script: 'FutariSousa_Korean', game: '둘이서 수사(후타리소우사)' },
  { script: 'Dracurouge_Korean', game: '드라크루주' },
  { script: 'LogHorizon_Korean', game: '로그 호라이즌' },
  { script: 'MonotoneMuseum_Korean', game: '모노톤 뮤지엄' },
  { script: 'BeginningIdol_Korean', game: '비기닝 아이돌' },
  { script: 'StratoShout_Korean', game: '스트라토 샤우트' },
  { script: 'Amadeus_Korean', game: '아마데우스' },
  { script: 'Insane_Korean', game: '인세인' },
  { script: 'Kamigakari_Korean', game: '카미가카리' },
  { script: 'Cthulhu7th_Korean', game: '크툴루의 부름 7판' },
  { script: 'Cthulhu_Korean', game: '크툴루' },
  { script: 'Fiasco_Korean', game: '피아스코' },
]
