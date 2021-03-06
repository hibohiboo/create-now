import React from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField'
import entrySheetModule, {
  useEntrySheet,
} from '../../../store/modules/entrySheetModule'
import InputField from '../../form/InputField'
import RadioField from '../../form/RadioField'

const InputArea: React.FC = () => {
  const entrySheet = useEntrySheet()
  const dispatch = useDispatch()
  const { update } = entrySheetModule.actions

  if (!entrySheet) {
    return <div>読込失敗</div>
  }
  return (
    <div style={{ maxWidth: '500px', minWidth: '200px' }}>
      <InputField
        model={entrySheet}
        type="text"
        prop="system"
        labelText="システム"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, system: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="title"
        labelText="シナリオタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, title: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="gmName"
        labelText="GM名"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, gmName: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="theme1"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme1: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="theme2"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme2: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="theme3"
        labelText="テーマ"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, theme3: e.target.value }))
        }
      />
      <RadioField
        model={entrySheet}
        prop="isExtend"
        labelText="延長"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, isExtend: Number(e.target.value) }))
        }
        items={[
          { label: 'あり', value: 1 },
          { label: 'なし', value: 2 },
        ]}
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="pcNumberMin"
        labelText="最小PC人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, pcNumberMin: Number(e.target.value) }),
          )
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="pcNumberBest"
        labelText="最適PC人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, pcNumberBest: Number(e.target.value) }),
          )
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="pcNumberMax"
        labelText="最大PC人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, pcNumberMax: Number(e.target.value) }),
          )
        }
      />
      <RadioField
        model={entrySheet}
        prop="serious"
        labelText="シリアス度"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, serious: Number(e.target.value) }))
        }
        items={[
          { label: '必須', value: 1 },
          { label: '必須ではないが重視', value: 2 },
          { label: 'あると嬉しい', value: 3 },
          { label: '不要', value: 4 },
        ]}
      />
      <RadioField
        model={entrySheet}
        prop="role"
        labelText="演技の重要度"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, role: Number(e.target.value) }))
        }
        items={[
          { label: '必須', value: 1 },
          { label: '必須ではないが重視', value: 2 },
          { label: 'あると嬉しい', value: 3 },
          { label: '不要', value: 4 },
        ]}
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="diceFace"
        labelText="使用ダイス"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, diceFace: Number(e.target.value) }))
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="diceNumber"
        labelText="ダイスの個数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, diceNumber: Number(e.target.value) }),
          )
        }
      />
      <RadioField
        model={entrySheet}
        prop="requiredRule"
        labelText="ルールブック"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, requiredRule: Number(e.target.value) }),
          )
        }
        items={[
          { label: '必須', value: 1 },
          { label: '不要', value: 2 },
        ]}
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="requiredOther"
        labelText="その他必要なもの"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, requiredOther: e.target.value }))
        }
      />
      <RadioField
        model={entrySheet}
        prop="charMake"
        labelText="キャラメイク"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, charMake: Number(e.target.value) }))
        }
        items={[
          { label: 'サンプルキャラあり', value: 1 },
          { label: '持込・作成可', value: 2 },
        ]}
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="charOther"
        labelText="キャラメイク備考"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, charOther: e.target.value }))
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="trpgBeginer"
        labelText="TRPG初心者対応人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, trpgBeginer: Number(e.target.value) }),
          )
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="systemBeginer"
        labelText="システム初心者対応人数"
        changeHandler={(e) =>
          dispatch(
            update({ ...entrySheet, systemBeginer: Number(e.target.value) }),
          )
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="ruleBook"
        labelText="準備しているルールブックの冊数"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, ruleBook: Number(e.target.value) }))
        }
      />
      <InputField
        model={entrySheet}
        type="number"
        prop="summary"
        labelText="準備しているサマリーの冊数"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, summary: Number(e.target.value) }))
        }
      />
      <InputField
        model={entrySheet}
        type="text"
        prop="equipOther"
        labelText="その他準備"
        changeHandler={(e) =>
          dispatch(update({ ...entrySheet, equipOther: e.target.value }))
        }
      />
      <TextField
        id="outlined-multiline-static"
        label="自由記入欄"
        multiline
        rows="10"
        variant="outlined"
        value={entrySheet.free}
        style={{ marginTop: '20px', marginBottom: '20px' }}
        fullWidth={true}
        onChange={(e) =>
          dispatch(update({ ...entrySheet, free: e.target.value }))
        }
      />
    </div>
  )
}

export default InputArea
