import React from 'react'
import { useDispatch } from 'react-redux'
import scenarioModule, {
  useScenario,
  usePdf,
  Scenario,
} from '../../store/modules/scenarioModule'

const docDefinition = (scenario: Scenario) => ({
  content: [
    { text: scenario.copy1, margin: [0, 25, 0, 5] },
    { text: scenario.copy2 },
    {
      svg:
        '<svg width="1000" height="50" viewBox="0 0 1000 50"><line x1="0" y1="25" x2="1000" y2="25" /></svg>',
    },
    { text: scenario.title, fontSize: 55, font: 'IPASerif' },
    {
      text: '.' + scenario.titleRuby,
      fontSize: 24,
      alignment: 'left',
      font: 'IPASerif',
    },
    { text: scenario.subTitle, fontSize: 20, font: 'IPASerif' },
    {
      text: `${scenario.pcNumber}     ${scenario.limit}    ${scenario.type}`,
      margin: [0, 50, 0, 0],
    },
  ],
  defaultStyle: {
    font: 'IPAGothic',
    alignment: 'center',
  },
})

const makePdf = async (scenario, dispatch) => {
  const pdf = await (
    await fetch('/api/pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(docDefinition(scenario)),
    })
  ).text()
  console.log(pdf)
  dispatch(scenarioModule.actions.setPdf(pdf))
}

const PdfArea: React.FC = () => {
  const scenario = useScenario()
  const pdf = usePdf()
  const dispatch = useDispatch()

  if (!scenario) {
    return <div>読込失敗</div>
  }
  return (
    <>
      <button onClick={() => makePdf(scenario, dispatch)}>PDFを作る</button>
      {pdf !== '' && (
        <a href={pdf} download="scenario.pdf">
          作成したPDFをダウンロード
        </a>
      )}
    </>
  )
}

export default PdfArea
