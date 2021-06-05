import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import URLImage from './atoms/CellImage'
import Hidden from '@material-ui/core/Hidden'
import TimeCell from './atoms/TimeCell'

const ImageArea: React.FC = () => {
  const cellCount = 13
  const canvasWidth = 0 + cellCount * 50
  const canvasHight = 100
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
                <TimeCell
                  x={1 + i * 50}
                  y={50}
                  key={i}
                  color={'yellow'}
                  text={i === 0 ? '' : (13 - i).toString()}
                />
              ))}
            <URLImage
              src={'/images/kakuriyogarden/icons/icooon/time.svg'}
              x={0}
              y={50}
              scale={1}
              size={50}
            />
            <Text
              y={10}
              width={canvasWidth}
              align="center"
              text={''}
              fontFamily={
                '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif'
              }
              fontSize={30}
            />
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
