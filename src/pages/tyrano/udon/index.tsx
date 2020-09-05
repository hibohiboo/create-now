import { useState } from 'react'
import Head from 'next/head'
import { createStyles, makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import { useViewModel } from '~/store/modules/tyranoudon/viewModel'
import UdonariumPanel from '~/components/organisms/tyranoudon/UdonariumPanel'
import TyranoPanel from '~/components/organisms/tyranoudon/TyranoPanel'
import ChatPanel from '~/components/organisms/tyranoudon/ChatPanel'
import CommandPanel from '~/components/organisms/tyranoudon/CommandPanel'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

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

  const [chatHeight, setChatHeight] = useState(240)
  const [chatWidth, setChatWidth] = useState(1200)
  const [commandHeight, setCommandHeight] = useState(240)
  const [commandWidth, setCommandWidth] = useState(1200)
  const onChatResize = (size) => {
    setChatHeight(size.height)
    setChatWidth(size.width)
  }
  const onCommandResize = (size) => {
    setCommandHeight(size.height)
    setCommandWidth(size.width)
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
      {ctx.tyranoOnly ? <></> : <UdonariumPanel is2d={ctx.is2d} />}
      {ctx.tyranoOnly ? (
        <div style={{ margin: '0 auto' }}>
          <TyranoPanel
            name={ctx.tyrano_name}
            defaultHeight={ctx.tyrano_height}
            defaultWidth={ctx.tyrano_width}
            sheet={ctx.tyrano_sheet}
            loaded={vm.tyranoStatus}
            draggable={!ctx.tyranoOnly}
            resizable={!ctx.tyranoOnly}
          />
        </div>
      ) : (
        <TyranoPanel
          name={ctx.tyrano_name}
          defaultHeight={ctx.tyrano_height}
          defaultWidth={ctx.tyrano_width}
          sheet={ctx.tyrano_sheet}
          loaded={vm.tyranoStatus}
          draggable={!ctx.tyranoOnly}
          resizable={!ctx.tyranoOnly}
        />
      )}
      {ctx.tyranoOnly ? (
        <></>
      ) : (
        <>
          <ChatPanel
            vm={vm}
            width={chatWidth}
            height={chatHeight}
            onResize={onChatResize}
          />
          <CommandPanel
            vm={vm}
            width={commandWidth}
            height={commandHeight}
            onResize={onCommandResize}
          />

          <DraggablePanel
            title="参考"
            width={commandWidth}
            height={commandHeight}
            onResize={onCommandResize}
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
                    href={`/tyrano/udon?tyrano_sheet=15nPd3S39OZZVxHUK0odXxcuDnYT_YIsK1oVP2zcKyd0&is2d=true`}
                  >
                    ティラノ初期ストーリー付きサンプル
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
        </>
      )}
    </div>
  )
}
Page.getInitialProps = async ({ query }) => {
  const tyrano = (query.tyrano || 'vchat_add') as string
  const tyrano_sheet = (query.tyrano_sheet ||
    '1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58') as string
  const is2d = (query.is2d && query.is2d === 'true') || false
  const tyranoOnly =
    (query.tyrano_only && query.tyrano_only === 'true') || false
  const width = (query.tyrano_width && Number(query.tyrano_width)) || null
  const height = (query.tyrano_height && Number(query.tyrano_height)) || null

  if (tyrano === 'chat_talk') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 430,
      tyrano_height: 640,
      tyrano_sheet,
      tyranoOnly,
    }
  }
  if (tyrano === 'vchat') {
    return {
      tyrano_name: tyrano,
      tyrano_width: 640,
      tyrano_height: 800,
      tyrano_sheet,
      tyranoOnly,
    }
  }
  if (tyrano === 'vchat_add') {
    return {
      tyrano_name: tyrano,
      tyrano_width: width || 480,
      tyrano_height: height || 640,
      tyrano_sheet,
      is2d,
      tyranoOnly,
    }
  }
  return {
    tyrano_name: 'sample',
    tyrano_width: width || 800,
    tyrano_height: height || 640,
    tyrano_sheet,
    tyranoOnly,
  }
}
