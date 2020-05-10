import React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import entrySheetModule, {
  useEntrySheet,
} from '~/store/modules/trpgManualModule'
import InputField from '~/components/form/InputField'
import RadioField from '~/components/form/RadioField'

const InputArea: React.FC = () => {
  const sheet = useEntrySheet()
  const dispatch = useDispatch()
  const { update } = entrySheetModule.actions

  if (!sheet) {
    return <div>読込失敗</div>
  }
  return (
    <div style={{ maxWidth: '500px', minWidth: '200px' }}>
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
