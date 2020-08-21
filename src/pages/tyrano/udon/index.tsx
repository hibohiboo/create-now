import { useState } from 'react'
import { GetStaticProps } from 'next'
import Head from 'next/head'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Layout from '~/components/templates/tyrano/Layout'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'
import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) =>
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

      <UdonariumPanel />
      <TyranoPanel
        name={ctx.tyrano_name}
        defaultHeight={ctx.tyrano_height}
        defaultWidth={ctx.tyrano_width}
        sheet={ctx.tyrano_sheet}
      />
      <DraggablePanel
        title="チャット"
        width={width}
        height={height}
        onResize={onResize}
      >
        <Box my={2} mx={3} display="flex">
          <div style={{ width: '200px' }}>
            <SelectField
              id="name"
              labelText="名前"
              items={vm.nameList}
              unselectedText=""
              value={vm.name}
              valueProp="value"
              changeHandler={({ name, value }: any) => vm.changeName(value)}
            />
          </div>
          <div style={{ width: '100px' }}>
            <SelectField
              id="face"
              labelText="表情"
              items={vm.faceList}
              unselectedText=""
              value={vm.face}
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
              model={vm}
              type="number"
              prop="tyranoFontSize"
              labelText={'サイズ'}
              changeHandler={(e) => vm.changeFontSize(e.target.value)}
            />
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranoCharaShow}
          >
            登場
          </Button>
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
              value={vm.text}
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
      >
        <Box my={2} style={{ height: `${height - 50}px`, overflowY: 'scroll' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={vm.sendTyranBgImageChange}
          >
            ユドナリウムの背景を適用
          </Button>
          <SelectField
            id="bg-method"
            labelText="背景切替演出"
            items={[...vm.methodList]}
            unselectedText=""
            value={vm.tyranoBackgroundMethod}
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
          <Box my={2}></Box>
        </Box>
      </DraggablePanel>
      <DraggablePanel
        title="参考"
        width={width}
        height={height}
        onResize={onResize}
      >
        <Box my={2} mx={3}>
          <ul>
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
            <li>{`${vm.udonariumBackgroundImage}`}</li>
            <li>{`${vm.tyranoFontColor}`}</li>
            <li>
              <a
                href={`/tyrano/udon?tyrano_sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58`}
              >
                リンク先例
              </a>
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
    }
  }
  return {
    tyrano_name: 'sample',
    tyrano_width: 800,
    tyrano_height: 640,
    tyrano_sheet,
  }
}
