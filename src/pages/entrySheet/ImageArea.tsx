import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '../../store/modules/entrySheetModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import URLImage from '../components/atoms/URLImage'
import Hidden from '@material-ui/core/Hidden'

const ImageArea: React.FC = () => {
  const entrysheet = useEntrySheet()

  if (!entrysheet) {
    return <div></div>
  }
  const canvasWidth = 800
  const canvasHight = 1130
  const leftPadding = 215
  const themePadding = leftPadding + 350
  const inputWidth = canvasWidth - leftPadding
  const fontSize = { system: 25, title: 80, titleRuby: 40, subTitle: 30 }
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
  }
  const checkChar = '✔'

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
            <URLImage src="/images/backgrounds/entrysheet.png" x={0} y={0} />
            <Text
              x={leftPadding}
              y={65}
              width={inputWidth}
              align="left"
              text={entrysheet.system}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding}
              y={120}
              width={inputWidth}
              align="left"
              text={entrysheet.title}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding}
              y={170}
              width={inputWidth}
              align="left"
              text={entrysheet.gmName}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + (entrysheet.isExtend === 1 ? 0 : 80)}
              y={215}
              width={inputWidth}
              align="left"
              text={checkChar}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding - 5}
              y={285}
              width={inputWidth}
              align="left"
              text={String(entrysheet.pcNumberMin)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 55}
              y={285}
              width={inputWidth}
              align="left"
              text={String(entrysheet.pcNumberBest)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 115}
              y={285}
              width={inputWidth}
              align="left"
              text={String(entrysheet.pcNumberMax)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={themePadding}
              y={170}
              width={inputWidth}
              align="left"
              text={entrysheet.theme1}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={themePadding}
              y={220}
              width={inputWidth}
              align="left"
              text={entrysheet.theme2}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={themePadding}
              y={270}
              width={inputWidth}
              align="left"
              text={entrysheet.theme3}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={
                leftPadding +
                (entrysheet.serious === 1
                  ? 0
                  : entrysheet.serious === 2
                  ? 80
                  : entrysheet.serious === 3
                  ? 300
                  : 465)
              }
              y={320}
              width={inputWidth}
              align="left"
              text={checkChar}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={
                leftPadding +
                (entrysheet.role === 1
                  ? 0
                  : entrysheet.role === 2
                  ? 85
                  : entrysheet.role === 3
                  ? 300
                  : 465)
              }
              y={370}
              width={inputWidth}
              align="left"
              text={checkChar}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 30}
              y={425}
              width={inputWidth}
              align="left"
              text={String(entrysheet.diceFace)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 130}
              y={425}
              width={inputWidth}
              align="left"
              text={String(entrysheet.diceNumber)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Ellipse
              x={leftPadding + 335 + (entrysheet.requiredRule === 1 ? 0 : 50)}
              y={435}
              radiusX={30}
              radiusY={15}
              stroke="#000"
              strokeWidth={3}
            />
            <Text
              x={leftPadding + 35}
              y={455}
              width={inputWidth}
              align="left"
              text={String(entrysheet.requiredOther)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + (entrysheet.charMake === 1 ? -5 : 210)}
              y={495}
              width={inputWidth}
              align="left"
              text={checkChar}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 400}
              y={500}
              width={inputWidth}
              align="left"
              text={String(entrysheet.charOther)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 110}
              y={550}
              width={inputWidth}
              align="left"
              text={String(entrysheet.trpgBeginer)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 350}
              y={550}
              width={inputWidth}
              align="left"
              text={String(entrysheet.systemBeginer)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 130}
              y={595}
              width={inputWidth}
              align="left"
              text={String(entrysheet.ruleBook)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 300}
              y={595}
              width={inputWidth}
              align="left"
              text={String(entrysheet.summary)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={leftPadding + 35}
              y={625}
              width={inputWidth}
              align="left"
              text={String(entrysheet.equipOther)}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={fontSize.system}
            />
            <Text
              x={40}
              y={720}
              width={inputWidth}
              align="left"
              text={String(entrysheet.free)}
              fill="#000"
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
