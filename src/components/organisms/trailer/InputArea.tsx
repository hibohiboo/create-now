import React from 'react'
import { useDispatch } from 'react-redux'
import scenarioModule, {
  useScenario,
} from '../../../store/modules/scenarioModule'
import InputField from '../../form/InputField'

const InputArea: React.FC = () => {
  const scenario = useScenario()
  const dispatch = useDispatch()
  const { update } = scenarioModule.actions

  if (!scenario) {
    return <div>読込失敗</div>
  }
  return (
    <>
      <InputField
        model={scenario}
        type="text"
        prop="copy1"
        labelText="コピー１"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, copy1: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="copy2"
        labelText="コピー2"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, copy2: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="system"
        labelText="システム"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, system: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="title"
        labelText="シナリオタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, title: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="titleRuby"
        labelText="タイトルルビ"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, titleRuby: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="subTitle"
        labelText="サブタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, subTitle: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="texnumbert"
        prop="pcNumber"
        labelText="PC人数"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, pcNumber: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="limit"
        labelText="リミット"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, limit: e.target.value }))
        }
      />
      <InputField
        model={scenario}
        type="text"
        prop="type"
        labelText="シナリオタイプ"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, type: e.target.value }))
        }
      />
    </>
  )
}

export default InputArea
