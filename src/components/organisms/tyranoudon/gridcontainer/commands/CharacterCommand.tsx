import { FC } from 'react'

import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
const CharacterCommand: FC<{
  vm: TyranoUdonViewModel
}> = ({ vm }) => {
  return (
    <List component="nav">
      <ListItem button onClick={vm.sendTyranoCharaHideAll}>
        全員退場
      </ListItem>
      <ListItem button onClick={vm.sendSway}>
        アニメテスト
      </ListItem>
      <ListItem button onClick={vm.sendSwayInfinite}>
        無限アニメテスト
      </ListItem>
      <ListItem button onClick={vm.sendMyAnime}>
        アニメテスト2
      </ListItem>
    </List>
  )
}
export default CharacterCommand
