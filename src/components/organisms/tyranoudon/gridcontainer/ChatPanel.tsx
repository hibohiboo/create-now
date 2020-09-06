import { FC, useState } from 'react'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'
import SuggestInputField from '~/components/form/SuggestInputField'
import SelectField from '~/components/form/SelectField'
import InputField from '~/components/form/InputField'
import type { TyranoUdonViewModel } from '~/store/modules/tyranoudon/viewModel'

const ChatPanel: FC<{
  vm: TyranoUdonViewModel
}> = ({ vm }) => {
  const chatKeydownHandler = (e) => {
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        vm.sendMessage()
        // 最後に入力した改行を消す
        setTimeout(() => vm.changeText(''), 0)
      }
    }
  }
  return (
    <Box>
      <Box my={2} mx={3} display="flex">
        <Button
          variant="contained"
          color="primary"
          onClick={vm.sendTyranoCharaShow}
          style={{ marginRight: '10px' }}
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
          style={{ marginLeft: '10px' }}
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
            onKeyDown={chatKeydownHandler}
          />
        </FormControl>
      </Box>
      <Box my={2} mx={4}>
        <Button variant="contained" color="primary" onClick={vm.sendMessage}>
          送信
        </Button>
      </Box>
    </Box>
  )
}
export default ChatPanel
