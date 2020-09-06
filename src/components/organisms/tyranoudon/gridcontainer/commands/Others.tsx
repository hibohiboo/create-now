import { FC } from 'react'

import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'
import List from '@material-ui/core/List'
import ListItem, { ListItemProps } from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
  return <ListItem button component="a" {...props} />
}

const MusicCommand: FC<{
  vm: TyranoUdonViewModel
  tyrano_sheet: string
}> = ({ vm, tyrano_sheet }) => {
  return (
    <List component="nav">
      <ListItemLink
        href={`https://docs.google.com/spreadsheets/d/${tyrano_sheet}/edit#gid=0`}
      >
        <ListItemText primary="設定スプレッドシート" />
      </ListItemLink>
      <ListItemLink
        href={`/tyrano/udon?tyrano_sheet=15nPd3S39OZZVxHUK0odXxcuDnYT_YIsK1oVP2zcKyd0&is2d=true&container=true`}
      >
        <ListItemText primary="ユドナリウム2d" />
      </ListItemLink>
      <ListItemLink
        href={`/tyrano/udon?tyrano_sheet=15nPd3S39OZZVxHUK0odXxcuDnYT_YIsK1oVP2zcKyd0&container=true`}
      >
        <ListItemText primary="ユドナリウム3d" />
      </ListItemLink>
      <ListItemLink href={`http://www5d.biglobe.ne.jp/~gakai/`}>
        <ListItemText primary="背景素材： きまぐれアフター" />
      </ListItemLink>
      <ListItemLink href={`https://tyrano.jp/`}>
        <ListItemText primary="参考： ティラノスクリプト" />
      </ListItemLink>
      <ListItemLink href="https://trpg-studio.com/">
        <ListItemText primary="参考： ＴＲＰＧスタジオ" />
      </ListItemLink>
    </List>
  )
}
export default MusicCommand
