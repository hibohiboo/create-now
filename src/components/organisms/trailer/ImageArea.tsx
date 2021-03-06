import React, { useState, useRef, useEffect } from 'react'
import { useScenario } from '../../../store/modules/scenarioModule'
import { Stage, Layer, Rect, Text, Line } from 'react-konva'
import { Hidden } from '@material-ui/core'

const ImageArea: React.FC = () => {
  const scenario = useScenario()

  if (!scenario) {
    return <div></div>
  }
  const canvasWidth = 800
  const canvasHight = 600
  const yCopy1 = 100
  const fontSize = { system: 20, title: 80, titleRuby: 40, subTitle: 30 }
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
  }
  const [url, setUrl] = useState('')
  const stageRef = useRef(null)
  let firstFlg = true

  const effect = () => {
    const stage = stageRef.current
    const canvas: HTMLCanvasElement = stage.toCanvas()
    setUrl(canvas.toDataURL())

    if (firstFlg) {
      firstFlg = false
      setTimeout(effect, 500) // useEffectで初回に呼ばれるときにはまだ描画がされていないので少し待ってから読み込む
    }
  }
  useEffect(effect)
  return (
    <>
      <Hidden mdUp implementation="css">
        <img className="sample-image" src={url} style={{ width: '100%' }}></img>
      </Hidden>
      <Hidden smDown implementation="css">
        <Stage width={canvasWidth} height={canvasHight} ref={stageRef}>
          <Layer>
            <Rect
              x={0}
              y={0}
              width={canvasWidth}
              height={canvasHight}
              fill={'#000'}
            />
            <Line points={[50, 200, 750, 200]} stroke="#fff" strokeWidth={2} />
            {/* </Layer>
      <Layer> */}
            <Text
              x={0}
              y={yCopy1}
              width={canvasWidth}
              align="center"
              text={scenario.copy1}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={0}
              y={yCopy1 + fontSize.system * 1.5}
              width={canvasWidth}
              align="center"
              text={scenario.copy2}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={0}
              y={canvasHight / 2 - fontSize.system * 3}
              width={canvasWidth}
              align="center"
              text={scenario.system}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={0}
              y={canvasHight / 2}
              width={canvasWidth}
              align="center"
              text={scenario.title}
              fill="#fff"
              fontFamily={family.serif}
              fontSize={fontSize.title}
            />
            <Text
              x={0}
              y={canvasHight / 2 + fontSize.title}
              width={canvasWidth}
              align="left"
              text={scenario.titleRuby}
              fill="#fff"
              fontFamily={family.serif}
              fontSize={fontSize.titleRuby}
            />
            <Text
              x={0}
              y={canvasHight / 2 + fontSize.title + fontSize.titleRuby * 1.5}
              width={canvasWidth}
              align="center"
              text={scenario.subTitle}
              fill="#fff"
              fontFamily={family.serif}
              fontSize={fontSize.subTitle}
            />
            <Text
              x={230}
              y={500}
              width={canvasWidth}
              align="left"
              text={`${scenario.pcNumber}`}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={380}
              y={500}
              width={canvasWidth}
              align="left"
              text={`${scenario.limit}`}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={530}
              y={500}
              width={canvasWidth}
              align="left"
              text={`${scenario.type}`}
              fill="#fff"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
