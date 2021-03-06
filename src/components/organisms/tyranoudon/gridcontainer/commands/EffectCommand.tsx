import { FC } from 'react'

import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
const EffectCommand: FC<{
  vm: TyranoUdonViewModel
}> = ({ vm }) => {
  return (
    <List component="nav">
      <ListItem button onClick={vm.sendQuakeHorizon}>
        揺らす（横揺れ）
      </ListItem>
      <ListItem button onClick={vm.sendQuake}>
        揺らす（縦揺れ）
      </ListItem>

      <ListItem>
        <SelectField
          id="layer-movie-items"
          labelText="合成映像選択"
          items={vm.layerMovie.items}
          unselectedText=""
          value={vm.layerMovie.url}
          valueProp="url"
          changeHandler={vm.changeLayerMovieItem}
        />
      </ListItem>
      <ListItem button onClick={vm.sendLayerModeMovie}>
        映像合成
      </ListItem>
      <ListItem button onClick={vm.sendFreeLayerModeMovie}>
        映像合成停止
      </ListItem>

      <ListItem button onClick={vm.sendZawaZawa}>
        ざわ……ざわ……
      </ListItem>

      <ListItem>
        <InputField
          model={vm}
          type="text"
          prop="sceneName"
          labelText={'シーン名'}
          changeHandler={(e) => vm.changeEffectTime(e.target.value)}
        />
      </ListItem>
      <ListItem button onClick={vm.sendSceneName}>
        シーン名表示
      </ListItem>
      <ListItem button onClick={vm.rubySample}>
        ルビサンプル
      </ListItem>
    </List>
  )
}
export default EffectCommand
