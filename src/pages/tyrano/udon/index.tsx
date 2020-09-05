import { useState } from 'react'
import Head from 'next/head'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'
import SelectField from '~/components/form/SelectField'
import SuggestInputField from '~/components/form/SuggestInputField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  }),
)

export default function Page(ctx) {
  const classes = useStyles()
  const vm = useViewModel(ctx)
  console.log('viewModel', vm)
  const [height, setHeight] = useState(240)
  const [width, setWidth] = useState(1200)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  // const firstTyranoPanelWidth = 800
  // if (global.window && global.window.innerWidth < 1600) {
  //   firstTyranoPanelWidth = global.window.innerWidth - 850
  //   console.log('width', global.window.innerWidth)
  // }

  return (
    <div className={classes.root}>
      <Head>
        <title>TyranoUdon</title>
      </Head>

      <UdonariumPanel is2d={ctx.is2d} />
      <TyranoPanel
        name={ctx.tyrano_name}
        defaultHeight={ctx.tyrano_height}
        defaultWidth={ctx.tyrano_width}
        sheet={ctx.tyrano_sheet}
        loaded={vm.tyranoStatus}
      />
      <DraggablePanel
        title="チャット"
        width={width}
        height={height}
        onResize={onResize}
        resizable={true}
        draggable={true}
      >
        <Box my={2} mx={3} display="flex">
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranoCharaShow}
          >
            登場
          </Button>
          <div style={{ width: '150px' }}>
            <SuggestInputField
              id="name"
              labelText="名前"
              items={vm.nameList}
              value={vm.characterSettings.name}
              valueProp="value"
              changeHandler={vm.changeName}
            />
          </div>
          <div style={{ width: '100px' }}>
            <SelectField
              id="face"
              labelText="表情"
              items={vm.faceList}
              unselectedText=""
              value={vm.characterSettings.face}
              changeHandler={({ name }) => vm.changeFace(name)}
            />
          </div>
          <div style={{ width: '50px', marginTop: '-10px' }}>
            <InputField
              model={vm}
              type="color"
              prop="tyranoFontColor"
              labelText={'文字色'}
              changeHandler={(e) => vm.changeFontColor(e.target.value)}
            />
          </div>
          <div style={{ width: '50px', marginTop: '-10px' }}>
            <InputField
              model={vm.chat}
              type="number"
              prop="tyranoFontSize"
              labelText={'サイズ'}
              changeHandler={(e) => vm.changeFontSize(e.target.value)}
            />
          </div>
          <div style={{ width: '80px' }}>
            <SelectField
              id="face"
              labelText="アニメ"
              items={[...vm.characterAnimationList]}
              unselectedText=""
              value={vm.characterSettings.characterMessageAnimation}
              changeHandler={({ name }) => vm.changeCharacterAnimation(name)}
            />
          </div>
          <div style={{ width: '100px', marginTop: '-10px' }}>
            <InputField
              model={vm.characterSettings}
              type="number"
              prop="characterPositionBottom"
              labelText={'キャラ縦位置'}
              changeHandler={(e) =>
                vm.changeCharacterPositionBottom(e.target.value)
              }
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranoCharaHide}
          >
            退場
          </Button>
        </Box>
        <Box my={1} mx={3}>
          <FormControl fullWidth style={{ marginTop: '10px' }}>
            <TextareaAutosize
              aria-label={'text'}
              rowsMin={3}
              value={vm.chat.text}
              onChange={(e) => vm.changeText(e.target.value)}
            />
          </FormControl>
        </Box>
        <Box my={2} mx={4}>
          <Button variant="contained" color="primary" onClick={vm.sendMessage}>
            送信
          </Button>
        </Box>
      </DraggablePanel>
      <DraggablePanel
        title="コマンド"
        width={width}
        height={height}
        onResize={onResize}
        resizable={true}
        draggable={true}
      >
        <Box
          my={2}
          mx={2}
          style={{ height: `${height - 50}px`, overflowY: 'scroll' }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranBgImageChange}
          >
            ユドナリウムの背景を適用
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendBackgroundChange}
          >
            URLの背景を適用
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendQuakeHorizon}
          >
            揺らす（横揺れ）
          </Button>
          <Button variant="contained" color="primary" onClick={vm.sendQuake}>
            揺らす（縦揺れ）
          </Button>
          <Box display="flex">
            <div style={{ width: '250px' }}>
              <SelectableInputField
                items={vm.backgroundList}
                value={vm.selectedBackground}
                id="bg-select"
                labelText="背景画像"
                changeHandler={vm.changeSelectedBackground}
              />
            </div>
            <div style={{ width: '250px' }}>
              <SelectableInputField
                items={vm.backgroundPatchesList}
                value={vm.selectedBackGroundPach}
                id="bg-select-patch"
                labelText="差分"
                changeHandler={vm.changeSelectedBackgroundPatch}
              />
            </div>

            <InputField
              model={vm.backgroundSettings}
              type="text"
              prop="imageUrl"
              labelText={'背景画像URL'}
              changeHandler={(e) => vm.changeBackgroundUrl(e.target.value)}
            />
          </Box>
          <SelectField
            id="bg-method"
            labelText="背景切替演出"
            items={[...vm.methodList]}
            unselectedText=""
            value={vm.backgroundSettings.tyranoBackgroundMethod}
            changeHandler={({ name }) => vm.changeBgMethod(name)}
          />

          <InputField
            model={vm}
            type="number"
            prop="tyranoEffectTime"
            labelText={'効果演出時間'}
            changeHandler={(e) => vm.changeEffectTime(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranoCharaHideAll}
          >
            全員退場
          </Button>
          <Button variant="contained" color="primary" onClick={vm.rubySample}>
            ルビサンプル
          </Button>
          <Button variant="contained" color="primary" onClick={vm.sendZawaZawa}>
            ざわ……ざわ……
          </Button>
          <InputField
            model={vm}
            type="text"
            prop="sceneName"
            labelText={'シーン名'}
            changeHandler={(e) => vm.changeEffectTime(e.target.value)}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendSceneName}
          >
            シーン名表示
          </Button>

          <Button variant="contained" color="primary" onClick={vm.sendSway}>
            キャラクターアニメテスト
          </Button>
          <Button variant="contained" color="primary" onClick={vm.sendMyAnime}>
            アニメテスト2
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendSwayInfinite}
          >
            無限アニメ
          </Button>
          <Box my={2}>
            <Button variant="contained" color="primary" onClick={vm.sendBlur}>
              ぼかす
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendBrightness}
            >
              暗く
            </Button>
            <Button variant="contained" color="primary" onClick={vm.sendSepia}>
              セピア
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendFreeFilter}
            >
              背景フィルタ解除
            </Button>
          </Box>
          <Box my={2} display="flex">
            <div style={{ width: '200px' }}>
              <SelectField
                id="youtube-items"
                labelText="Youtube"
                items={vm.youtubeSettings.items}
                unselectedText=""
                value={vm.youtubeSettings.id}
                valueProp="id"
                changeHandler={vm.changeYoutubeItem}
              />
            </div>
            <Box mx={3} style={{ width: '100px', marginTop: '-10px' }}>
              <InputField
                model={vm.youtubeSettings}
                type="text"
                prop="id"
                labelText={'動画ID'}
                changeHandler={(e) => vm.changeYoutubeId(e.target.value)}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendYoutube}
            >
              youtube再生
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendStopYoutube}
            >
              youtube止める
            </Button>
          </Box>
          <Box my={2} display="flex">
            <div style={{ width: '200px' }}>
              <SelectField
                id="bgm-items"
                labelText="BGM"
                items={vm.bgmSettings.items}
                unselectedText=""
                value={vm.bgmSettings.bgmUrl}
                valueProp="url"
                changeHandler={vm.changeBgmItem}
              />
            </div>

            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendPlayBGM}
            >
              再生
            </Button>

            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendStopBGM}
            >
              止める
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendFadeInBGM}
            >
              フェードイン
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={vm.sendFadeOutBGM}
            >
              フェードアウト
            </Button>
          </Box>
          <Box my={2}></Box>
        </Box>
      </DraggablePanel>
      <DraggablePanel
        title="参考"
        width={width}
        height={height}
        onResize={onResize}
        resizable={true}
        draggable={true}
      >
        <Box my={2} mx={3}>
          <ul>
            <li>
              <a
                href={`/tyrano/udon?tyrano_sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58&is2d=true`}
              >
                2dモード
              </a>
            </li>
            <li>
              <a
                href={`/tyrano/udon?tyrano_sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58`}
              >
                3dモード
              </a>
            </li>
            <li>
              <a href="http://www5d.biglobe.ne.jp/~gakai/">
                背景素材： きまぐれアフター
              </a>
            </li>
            <li>
              <a href="https://tyrano.jp/">参考： ティラノスクリプト</a>
            </li>
            <li>
              <a href="https://trpg-studio.com/">参考： ＴＲＰＧスタジオ</a>
            </li>
            <li>
              <a href="https://github.com/TK11235/udonarium">
                参考： ユドナリウム
              </a>
            </li>
            <li>
              <a href="https://yoshis-island.net/">参考： ユドナリウム2d</a>
            </li>

            <li>
              <a
                href={`https://docs.google.com/spreadsheets/d/${ctx.tyrano_sheet}/edit#gid=0`}
              >
                立ち絵シート
              </a>
            </li>
            <li>
              <a
                href={`https://scrapbox.io/tyranoudon/%E7%AB%8B%E3%81%A1%E7%B5%B5`}
              >
                立ち絵置き場サンプル
              </a>
            </li>
            <li>{`${vm.udonariumBackgroundImage}`}</li>
            <li>{`${vm.chat.tyranoFontColor}`}</li>
          </ul>
        </Box>
      </DraggablePanel>
    </div>
  )
}
Page.getInitialProps = async ({ query }) => {
  const tyrano = (query.tyrano || 'vchat_add') as string
  const tyrano_sheet = (query.tyrano_sheet ||
    '1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58') as string
  const is2d = (query.is2d && query.is2d === 'true') || false
  if (tyrano === 'chat_talk') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 430,
      tyrano_height: 640,
      tyrano_sheet,
    }
  }
  if (tyrano === 'vchat') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 640,
      tyrano_height: 800,
      tyrano_sheet,
    }
  }
  if (tyrano === 'vchat_add') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 480,
      tyrano_height: 640,
      tyrano_sheet,
      is2d,
    }
  }
  return {
    tyrano_name: 'sample',
    tyrano_width: 800,
    tyrano_height: 640,
    tyrano_sheet,
  }
}
