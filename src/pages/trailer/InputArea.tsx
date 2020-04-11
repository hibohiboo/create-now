import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import scenarioModule, {
  useScenario,
  Scenario
} from '../../store/modules/scenarioModule'

const InputField: React.FC<{
  scenario: Scenario
  type: string
  prop: string
  labelText: string
  changeHandler: any
}> = ({ scenario, type, prop, labelText, changeHandler }) => (
  <label>
    {labelText}
    <input type={type} value={scenario[prop]} onChange={changeHandler} />
  </label>
)

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
        scenario={scenario}
        type="text"
        prop="copy1"
        labelText="コピー１"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, copy1: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="copy2"
        labelText="コピー2"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, copy2: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="system"
        labelText="システム"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, system: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="title"
        labelText="シナリオタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, title: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="titleRuby"
        labelText="タイトルルビ"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, titleRuby: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="subTitle"
        labelText="サブタイトル"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, subTitle: e.target.value }))
        }
      />
      <InputField
        scenario={scenario}
        type="texnumbert"
        prop="pcNumber"
        labelText="PC人数"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, pcNumber: Number(e.target.value) }))
        }
      />
      <InputField
        scenario={scenario}
        type="text"
        prop="limit"
        labelText="リミット"
        changeHandler={(e) =>
          dispatch(update({ ...scenario, limit: Number(e.target.value) }))
        }
      />
      <InputField
        scenario={scenario}
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
