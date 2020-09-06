import { FC } from 'react'

import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
const BackgroundCommand: FC<{
  vm: TyranoUdonViewModel
}> = ({ vm }) => {
  return (
    <List component="nav">
      <ListItem>
        <SelectableInputField
          items={vm.backgroundList}
          value={vm.selectedBackground}
          id="bg-select"
          labelText="背景画像"
          changeHandler={vm.changeSelectedBackground}
        />
      </ListItem>
      <ListItem>
        <SelectableInputField
          items={vm.backgroundPatchesList}
          value={vm.selectedBackGroundPach}
          id="bg-select-patch"
          labelText="差分"
          changeHandler={vm.changeSelectedBackgroundPatch}
        />
      </ListItem>
      <ListItem>
        <InputField
          model={vm.backgroundSettings}
          type="text"
          prop="imageUrl"
          labelText={'背景画像URL'}
          changeHandler={(e) => vm.changeBackgroundUrl(e.target.value)}
        />
      </ListItem>
      <ListItem button onClick={vm.sendBackgroundChange}>
        URLの背景を適用
      </ListItem>
      <ListItem button onClick={vm.sendTyranBgImageChange}>
        ユドナリウム背景を適用
      </ListItem>
      <ListItem>
        <SelectField
          id="bg-method"
          labelText="背景切替演出"
          items={[...vm.methodList]}
          unselectedText=""
          value={vm.backgroundSettings.tyranoBackgroundMethod}
          changeHandler={({ name }) => vm.changeBgMethod(name)}
        />
      </ListItem>
      <ListItem>
        <InputField
          model={vm}
          type="number"
          prop="tyranoEffectTime"
          labelText={'効果演出時間'}
          changeHandler={(e) => vm.changeEffectTime(e.target.value)}
        />
      </ListItem>

      <ListItem button onClick={vm.sendBlur}>
        ぼかす
      </ListItem>
      <ListItem button onClick={vm.sendBrightness}>
        暗く
      </ListItem>
      <ListItem button onClick={vm.sendSepia}>
        セピア
      </ListItem>
      <ListItem button onClick={vm.sendFreeFilter}>
        背景フィルタ解除
      </ListItem>
    </List>
  )
}
export default BackgroundCommand
