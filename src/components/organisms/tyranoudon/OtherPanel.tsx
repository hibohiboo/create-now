import { FC, useState } from 'react'
import { Box } from '@material-ui/core'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'

const OtherPanel: FC<{
  width: number
  height: number
  tyrano_sheet: string
  vm: TyranoUdonViewModel
}> = ({ vm, width, height, tyrano_sheet }) => {
  const [otherHeight, setHeight] = useState(height)
  const [otherWidth, setWidth] = useState(width)

  const onCommandResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <DraggablePanel
      title="参考"
      width={otherWidth}
      height={otherHeight}
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
              href={`https://docs.google.com/spreadsheets/d/${tyrano_sheet}/edit#gid=0`}
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
  )
}
export default OtherPanel
