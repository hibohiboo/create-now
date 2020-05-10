import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import { Favorite } from '@material-ui/icons'
import URLImage from '../../atoms/URLImage'
import Hidden from '@material-ui/core/Hidden'

const ImageArea: React.FC = () => {
  const sheet = useEntrySheet()

  if (!sheet) {
    return <div></div>
  }
  const canvasWidth = 1192
  const canvasHight = 1684
  const leftPadding = 215
  const themePadding = leftPadding + 350
  const inputWidth = canvasWidth - leftPadding
  const fontSize = { system: 25, title: 80, titleRuby: 40, subTitle: 30 }
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
    fontawesome: '"Font Awesome 5 Free", "Font Awesome 5 Brands"',
  }
  // Font Awesome のfont-weightのルール
  const faWeight = { solid: '900', regular: '400', brands: '400', light: '300' }
  const faUnicode = { heart: '\uf004', check: '\uf00c' }
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

  const Heart: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <Text
      x={x}
      y={y}
      width={inputWidth}
      align="left"
      text={faUnicode.heart}
      fill={sheet.heartColor}
      fontFamily={family.fontawesome}
      fontStyle={faWeight.solid}
      fontSize={60}
    />
  )
  const Check: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <Text
      x={x}
      y={y}
      width={inputWidth}
      align="left"
      text={faUnicode.check}
      fill={sheet.heartColor}
      fontFamily={family.fontawesome}
      fontStyle={faWeight.solid}
      fontSize={70}
    />
  )

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
              fill={'#fff'}
            />
            <URLImage src="/images/trpg-manual/black.png" x={0} y={0} />
            <Text
              x={640}
              y={115}
              width={inputWidth}
              align="left"
              text={sheet.name}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={30}
            />
            <Check x={42} y={443} />
            <Heart x={40} y={525} />
            <Text
              x={640}
              y={174}
              width={inputWidth}
              align="left"
              text={sheet.id}
              fill="#000"
              fontFamily={family.gothic}
              fontSize={20}
            />

            <Text
              x={
                leftPadding +
                (sheet.serious === 1
                  ? 0
                  : sheet.serious === 2
                  ? 80
                  : sheet.serious === 3
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

            <Ellipse
              x={leftPadding + 335 + (sheet.requiredRule === 1 ? 0 : 50)}
              y={435}
              radiusX={30}
              radiusY={15}
              stroke="#000"
              strokeWidth={3}
            />

            <Text
              x={480}
              y={1430}
              width={inputWidth}
              align="left"
              text={String(sheet.free)}
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
