import React from 'react'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Box,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core'
import entrySheetModule, {
  useEntrySheet,
} from '~/store/modules/trpgManualModule'
import InputField from '~/components/form/InputField'
import RadioField from '~/components/form/RadioField'

const InputArea: React.FC = () => {
  const sheet = useEntrySheet()
  const dispatch = useDispatch()
  const { update } = entrySheetModule.actions
  const noproFavItems = [
    { label: '', value: 0 },
    { label: 'No Problem', value: 1 },
    { label: 'Favorite', value: 2 },
  ]
  if (!sheet) {
    return <div>読込失敗</div>
  }
  return (
    <div style={{ maxWidth: '500px', minWidth: '200px' }}>
      <InputLabel>Profile</InputLabel>
      <Box m={2}>
        <InputField
          model={sheet}
          type="text"
          prop="name"
          labelText="名前"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, name: e.target.value }))
          }
        />
        <InputField
          model={sheet}
          type="text"
          prop="id"
          labelText="ID"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, id: e.target.value }))
          }
        />
        <RadioField
          model={sheet}
          prop="exp"
          labelText="経験"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, exp: Number(e.target.value) }))
          }
          items={[
            { label: 'Novice', value: 0 },
            { label: 'Young', value: 1 },
            { label: 'Senior', value: 2 },
          ]}
        />
      </Box>
      <Box display="flex">
        <InputField
          model={sheet}
          type="color"
          prop="checkColor"
          labelText="チェックの色"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, checkColor: e.target.value }))
          }
        />
        <InputField
          model={sheet}
          type="color"
          prop="heartColor"
          labelText="ハートの色"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, heartColor: e.target.value }))
          }
        />
      </Box>
      <RadioField
        model={sheet}
        prop="mystery"
        labelText="推理"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, mystery: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="battle"
        labelText="戦闘"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, battle: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="horror"
        labelText="ホラー"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, horror: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="grotesque"
        labelText="グロ"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, grotesque: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="gl"
        labelText="GL"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, gl: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="bl"
        labelText="BL"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, bl: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="love"
        labelText="恋愛"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, love: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="PvP"
        labelText="PvP"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, PvP: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="depression"
        labelText="鬱"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, depression: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <RadioField
        model={sheet}
        prop="decision"
        labelText="決断"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, decision: Number(e.target.value) }))
        }
        items={noproFavItems}
      />
      <InputLabel>Play Style</InputLabel>
      <Box m={2}>
        <InputLabel>On-Line</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.voice}
              onChange={(e) =>
                dispatch(update({ ...sheet, voice: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Voice"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.text}
              onChange={(e) =>
                dispatch(update({ ...sheet, text: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Text"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.textWithVoice}
              onChange={(e) =>
                dispatch(update({ ...sheet, textWithVoice: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Text With Voice"
        />
        <InputLabel>Off-Line</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.onTheTable}
              onChange={(e) =>
                dispatch(update({ ...sheet, onTheTable: e.target.checked }))
              }
              color="primary"
            />
          }
          label="On The Table"
        />
        <InputLabel>Tools</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.ccfolia}
              onChange={(e) =>
                dispatch(update({ ...sheet, ccfolia: e.target.checked }))
              }
              color="primary"
            />
          }
          label="ココフォリア"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.dodontof}
              onChange={(e) =>
                dispatch(update({ ...sheet, dodontof: e.target.checked }))
              }
              color="primary"
            />
          }
          label="どどんとふ"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.discord}
              onChange={(e) =>
                dispatch(update({ ...sheet, discord: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Discord"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.skype}
              onChange={(e) =>
                dispatch(update({ ...sheet, skype: e.target.checked }))
              }
              color="primary"
            />
          }
          label="Skype"
        />
        {/* <InputField
          model={sheet}
          type="text"
          prop="others"
          labelText="Other"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, others: e.target.value }))
          }
        /> */}
        <TextField
          id="tool-other"
          label="Other"
          multiline
          rows="2"
          variant="outlined"
          value={sheet.others}
          style={{ marginTop: '20px', marginBottom: '20px' }}
          fullWidth={true}
          onChange={(e) =>
            dispatch(update({ ...sheet, others: e.target.value }))
          }
        />
      </Box>

      <InputField
        model={sheet}
        type="text"
        prop="gmName"
        labelText="GM名"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, gmName: e.target.value }))
        }
      />
      <InputField
        model={sheet}
        type="text"
        prop="theme1"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, theme1: e.target.value }))
        }
      />
      <InputField
        model={sheet}
        type="text"
        prop="theme2"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, theme2: e.target.value }))
        }
      />
      <InputField
        model={sheet}
        type="text"
        prop="theme3"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, theme3: e.target.value }))
        }
      />
      <RadioField
        model={sheet}
        prop="isExtend"
        labelText="延長"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, isExtend: Number(e.target.value) }))
        }
        items={[
          { label: 'あり', value: 1 },
          { label: 'なし', value: 2 },
        ]}
      />
      <InputField
        model={sheet}
        type="number"
        prop="pcNumberMin"
        labelText="最小PC人数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, pcNumberMin: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="pcNumberBest"
        labelText="最適PC人数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, pcNumberBest: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="pcNumberMax"
        labelText="最大PC人数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, pcNumberMax: Number(e.target.value) }))
        }
      />
      <RadioField
        model={sheet}
        prop="serious"
        labelText="シリアス度"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, serious: Number(e.target.value) }))
        }
        items={[
          { label: '必須', value: 1 },
          { label: '必須ではないが重視', value: 2 },
          { label: 'あると嬉しい', value: 3 },
          { label: '不要', value: 4 },
        ]}
      />
      <RadioField
        model={sheet}
        prop="role"
        labelText="演技の重要度"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, role: Number(e.target.value) }))
        }
        items={[
          { label: '必須', value: 1 },
          { label: '必須ではないが重視', value: 2 },
          { label: 'あると嬉しい', value: 3 },
          { label: '不要', value: 4 },
        ]}
      />
      <InputField
        model={sheet}
        type="number"
        prop="diceFace"
        labelText="使用ダイス"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, diceFace: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="diceNumber"
        labelText="ダイスの個数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, diceNumber: Number(e.target.value) }))
        }
      />
      <RadioField
        model={sheet}
        prop="requiredRule"
        labelText="ルールブック"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, requiredRule: Number(e.target.value) }))
        }
        items={[
          { label: '必須', value: 1 },
          { label: '不要', value: 2 },
        ]}
      />
      <InputField
        model={sheet}
        type="text"
        prop="requiredOther"
        labelText="その他必要なもの"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, requiredOther: e.target.value }))
        }
      />
      <RadioField
        model={sheet}
        prop="charMake"
        labelText="キャラメイク"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, charMake: Number(e.target.value) }))
        }
        items={[
          { label: 'サンプルキャラあり', value: 1 },
          { label: '持込・作成可', value: 2 },
        ]}
      />
      <InputField
        model={sheet}
        type="text"
        prop="charOther"
        labelText="キャラメイク備考"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, charOther: e.target.value }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="trpgBeginer"
        labelText="TRPG初心者対応人数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, trpgBeginer: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="systemBeginer"
        labelText="システム初心者対応人数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, systemBeginer: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="ruleBook"
        labelText="準備しているルールブックの冊数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, ruleBook: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="number"
        prop="summary"
        labelText="準備しているサマリーの冊数"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, summary: Number(e.target.value) }))
        }
      />
      <InputField
        model={sheet}
        type="text"
        prop="equipOther"
        labelText="その他準備"
        changeHandler={(e) =>
          dispatch(update({ ...sheet, equipOther: e.target.value }))
        }
      />
      <TextField
        id="outlined-multiline-static"
        label="自由記入欄"
        multiline
        rows="10"
        variant="outlined"
        value={sheet.free}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        fullWidth={true}
        onChange={(e) => dispatch(update({ ...sheet, free: e.target.value }))}
      />
    </div>
  )
}

export default InputArea
