import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import URLImage from './URLImage'
import Hidden from '@material-ui/core/Hidden'
import Cell from './atoms/Cell'

const ImageArea: React.FC = () => {
  const cellCount = 10
  const canvasWidth = 50 + cellCount * 50
  const canvasHight = 200
  const leftPadding = 5
  const inputWidth = canvasWidth - leftPadding
  const family = {
    gothic:
      '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif',
    serif:
      '"游明朝", YuMincho, "Hiragino Mincho ProN W3", "ヒラギノ明朝 ProN W3", "Hiragino Mincho ProN", "HG明朝E", "ＭＳ Ｐ明朝", "ＭＳ 明朝", serif',
    fontawesome: '"Font Awesome 5 Free", "Font Awesome 5 Brands"',
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

  const Circle: React.FC<{ x: number; y: number }> = ({ x, y }) => (
    <Ellipse
      x={x}
      y={y}
      radiusX={40}
      radiusY={20}
      stroke={'#fff'}
      strokeWidth={5}
    />
  )
  const cellSize = 50

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
              fill={'white'}
            />
            {Array(cellCount)
              .fill(0)
              .map((x, i) => (
                <Cell x={5 + i * 50} y={5} key={i} color={'yellow'} />
              ))}

            {/* <URLImage
              src={sheet.previewUrl}
              x={sheet.imageX}
              y={sheet.imageY}
              scale={sheet.scale / 100}
            />

            <Text
              x={480}
              y={1150}
              width={inputWidth}
              align="left"
              text={String(sheet.rulebook)}
              fill={sheet.fontColor}
              fontFamily={family.gothic}
              fontSize={sheet.rulebookFontSize}
            /> */}
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
