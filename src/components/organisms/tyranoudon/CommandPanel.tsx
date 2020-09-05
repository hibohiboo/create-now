import { FC } from 'react'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'
import SuggestInputField from '~/components/form/SuggestInputField'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import SelectableInputField from '~/components/form/SelectableInputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'

const CommandPanel: FC<{
  width: number
  height: number
  onResize: (size) => void
  vm: TyranoUdonViewModel
}> = ({ vm, width, height, onResize }) => (
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
      <Button variant="contained" color="primary" onClick={vm.sendQuakeHorizon}>
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
      <Button variant="contained" color="primary" onClick={vm.sendSceneName}>
        シーン名表示
      </Button>

      <Button variant="contained" color="primary" onClick={vm.sendSway}>
        キャラクターアニメテスト
      </Button>
      <Button variant="contained" color="primary" onClick={vm.sendMyAnime}>
        アニメテスト2
      </Button>
      <Button variant="contained" color="primary" onClick={vm.sendSwayInfinite}>
        無限アニメ
      </Button>
      <Box my={2}>
        <Button variant="contained" color="primary" onClick={vm.sendBlur}>
          ぼかす
        </Button>
        <Button variant="contained" color="primary" onClick={vm.sendBrightness}>
          暗く
        </Button>
        <Button variant="contained" color="primary" onClick={vm.sendSepia}>
          セピア
        </Button>
        <Button variant="contained" color="primary" onClick={vm.sendFreeFilter}>
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

        <Button variant="contained" color="primary" onClick={vm.sendYoutube}>
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

        <Button variant="contained" color="primary" onClick={vm.sendPlayBGM}>
          再生
        </Button>

        <Button variant="contained" color="primary" onClick={vm.sendStopBGM}>
          止める
        </Button>
        <Button variant="contained" color="primary" onClick={vm.sendFadeInBGM}>
          フェードイン
        </Button>
        <Button variant="contained" color="primary" onClick={vm.sendFadeOutBGM}>
          フェードアウト
        </Button>
      </Box>
      <Box my={2}></Box>
    </Box>
  </DraggablePanel>
)
export default CommandPanel
