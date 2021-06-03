import React, { useState, useRef, useEffect } from 'react'
import { useEntrySheet } from '~/store/modules/trpgManualModule'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
import URLImage from './atoms/URLImage'
import Hidden from '@material-ui/core/Hidden'
import Cell from './atoms/GardenCell'
import { Gemory } from '~/domain/kakuriyogarden/classes/gemory'
import { getHopeImageUrl, Hope } from '~/domain/kakuriyogarden/classes/hope'

const ImageArea: React.FC<{
  gardenItems: Gemory[]
  hope: Hope
  color: string
}> = ({ gardenItems, color, hope }) => {
  const size = 50
  const cellCount = Math.max(...gardenItems.map((i) => i.cards.length))
  const canvasWidth = 2 + cellCount * size
  const canvasHight = 2 + size * (gardenItems.length + 1)
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
            {gardenItems.map((x, i) =>
              x.cards.map((y, j) => (
                <Cell
                  x={1 + j * size}
                  y={1 + i * size}
                  key={`${i}${j}`}
                  color={color}
                  image={`/images/kakuriyogarden/icons/game-icons/crystal-growth.svg`}
                />
              )),
            )}
            <Cell
              x={1 + 0 * size}
              y={1 + gardenItems.length * size}
              color={color}
              image={`/images/kakuriyogarden/icons/game-icons/crystal-growth.svg`}
            />
            <Cell
              x={1 + 1 * size}
              y={1 + gardenItems.length * size}
              color={color}
              image={getHopeImageUrl(hope)}
            />
          </Layer>
        </Stage>
      </Hidden>
    </>
  )
}

export default ImageArea
