import React from 'react'
import { useDispatch } from 'react-redux'
import {
  TextField,
  Box,
  InputLabel,
  FormControlLabel,
  Checkbox,
  Button,
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
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onloadend = async () => {
      dispatch(update({ ...sheet, previewUrl: reader.result.toString() }))
    }

    reader.readAsDataURL(file)
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
      <Box my={2}>
        <InputLabel>画像</InputLabel>
        <Button component="label" color="primary">
          画像ファイルを選択
          <input
            type="file"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
        </Button>
        <Box display="flex">
          <InputField
            model={sheet}
            type="number"
            prop="imageX"
            labelText="横調整"
            changeHandler={(e) =>
              dispatch(update({ ...sheet, imageX: Number(e.target.value) }))
            }
          />
          <InputField
            model={sheet}
            type="number"
            prop="imageY"
            labelText="縦調整"
            changeHandler={(e) =>
              dispatch(update({ ...sheet, imageY: Number(e.target.value) }))
            }
          />
        </Box>
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
        <InputField
          model={sheet}
          type="color"
          prop="circleColor"
          labelText="マルの色"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, circleColor: e.target.value }))
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
      <Box>
        <RadioField
          model={sheet}
          prop="gm"
          labelText="Game Master"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, gm: Number(e.target.value) }))
          }
          items={[
            { label: 'Never', value: 0 },
            { label: 'Often', value: 1 },
            { label: 'Many', value: 2 },
            { label: 'Shura', value: 3 },
          ]}
        />
        <RadioField
          model={sheet}
          prop="pl"
          labelText="Player"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, pl: Number(e.target.value) }))
          }
          items={[
            { label: 'Never', value: 0 },
            { label: 'Often', value: 1 },
            { label: 'Many', value: 2 },
            { label: 'Shura', value: 3 },
          ]}
        />
      </Box>

      <Box>
        <InputLabel>Role Play</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.rpMany}
              onChange={(e) =>
                dispatch(update({ ...sheet, rpMany: e.target.checked }))
              }
              color="primary"
            />
          }
          label="たくさんしたい！"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.rpOften}
              onChange={(e) =>
                dispatch(update({ ...sheet, rpOften: e.target.checked }))
              }
              color="primary"
            />
          }
          label="ほどほどが良い"
        />
      </Box>

      <Box>
        <InputLabel>Scenario</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.scenario}
              onChange={(e) =>
                dispatch(update({ ...sheet, scenario: e.target.checked }))
              }
              color="primary"
            />
          }
          label="過程を楽しみたい"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.scenarioC}
              onChange={(e) =>
                dispatch(update({ ...sheet, scenarioC: e.target.checked }))
              }
              color="primary"
            />
          }
          label="ゲームクリアを目指したい"
        />
      </Box>
      <Box>
        <InputLabel>Character Lost</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.lostNo}
              onChange={(e) =>
                dispatch(update({ ...sheet, lostNo: e.target.checked }))
              }
              color="primary"
            />
          }
          label="ぜったい嫌！"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.lostYes}
              onChange={(e) =>
                dispatch(update({ ...sheet, lostYes: e.target.checked }))
              }
              color="primary"
            />
          }
          label="散り際こそ美しい"
        />
      </Box>
      <Box>
        <InputLabel>Rule</InputLabel>
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.ruleStrict}
              onChange={(e) =>
                dispatch(update({ ...sheet, ruleStrict: e.target.checked }))
              }
              color="primary"
            />
          }
          label="ルールを重視する"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={sheet.ruleFasy}
              onChange={(e) =>
                dispatch(update({ ...sheet, ruleFasy: e.target.checked }))
              }
              color="primary"
            />
          }
          label="改変を許容する"
        />
      </Box>
      <TextField
        id="outlined-multiline-static"
        label="Rule Book / Supplement"
        multiline
        rows="10"
        variant="outlined"
        value={sheet.rulebook}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        fullWidth={true}
        onChange={(e) =>
          dispatch(update({ ...sheet, rulebook: e.target.value }))
        }
      />
      <TextField
        id="outlined-multiline-static"
        label="Comment"
        multiline
        rows="10"
        variant="outlined"
        value={sheet.free}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        fullWidth={true}
        onChange={(e) => dispatch(update({ ...sheet, free: e.target.value }))}
      />
      <InputLabel>フォントサイズ</InputLabel>
      <Box m={2} display="flex">
        <InputField
          model={sheet}
          type="number"
          prop="nameFontSize"
          labelText="Name"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, nameFontSize: Number(e.target.value) }))
          }
        />
        <InputField
          model={sheet}
          type="number"
          prop="idFontSize"
          labelText="ID"
          changeHandler={(e) =>
            dispatch(update({ ...sheet, idFontSize: Number(e.target.value) }))
          }
        />
        <InputField
          model={sheet}
          type="number"
          prop="rulebookFontSize"
          labelText="Rule Book"
          changeHandler={(e) =>
            dispatch(
              update({ ...sheet, rulebookFontSize: Number(e.target.value) }),
            )
          }
        />
        <InputField
          model={sheet}
          type="number"
          prop="commentFontSize"
          labelText="Comment"
          changeHandler={(e) =>
            dispatch(
              update({ ...sheet, commentFontSize: Number(e.target.value) }),
            )
          }
        />
      </Box>
    </div>
  )
}

export default InputArea
