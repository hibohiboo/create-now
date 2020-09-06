import { FC } from 'react'

import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
const MusicCommand: FC<{
  vm: TyranoUdonViewModel
}> = ({ vm }) => {
  return (
    <List component="nav">
      <ListItem>
        <SelectField
          id="youtube-items"
          labelText="Youtube"
          items={vm.youtubeSettings.items}
          unselectedText=""
          value={vm.youtubeSettings.id}
          valueProp="id"
          changeHandler={vm.changeYoutubeItem}
        />
      </ListItem>

      <ListItem>
        <InputField
          model={vm.youtubeSettings}
          type="text"
          prop="id"
          labelText={'動画ID'}
          changeHandler={(e) => vm.changeYoutubeId(e.target.value)}
        />
      </ListItem>
      <ListItem button onClick={vm.sendYoutube}>
        youtube再生
      </ListItem>
      <ListItem button onClick={vm.sendStopYoutube}>
        youtube止める
      </ListItem>
      <ListItem>
        <SelectField
          id="bgm-items"
          labelText="BGM"
          items={vm.bgmSettings.items}
          unselectedText=""
          value={vm.bgmSettings.bgmUrl}
          valueProp="url"
          changeHandler={vm.changeBgmItem}
        />
      </ListItem>
      <ListItem button onClick={vm.sendPlayBGM}>
        再生
      </ListItem>
      <ListItem button onClick={vm.sendStopBGM}>
        止める
      </ListItem>
      <ListItem button onClick={vm.sendFadeInBGM}>
        フェードイン
      </ListItem>
      <ListItem button onClick={vm.sendFadeOutBGM}>
        フェードアウト
      </ListItem>
    </List>
  )
}
export default MusicCommand
