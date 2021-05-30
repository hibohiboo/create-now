import React from 'react'
import { Group, Rect, Text } from 'react-konva'
const cellSize = 50
export default ({
  x,
  y,
  color,
  text,
}: {
  x: number
  y: number
  color: string
  text: string
}) => (
  <Group x={x} y={y}>
    <Rect
      width={cellSize}
      height={cellSize}
      fill={color}
      stroke={'black'}
      strokeWidth={2}
    />
    <Text
      y={10}
      width={50}
      align="center"
      text={text}
      fontFamily={
        '"Hiragino Sans W3", "Hiragino Kaku Gothic ProN", "ヒラギノ角ゴ ProN W3", "メイリオ", Meiryo, "ＭＳ Ｐゴシック", "MS PGothic", sans-serif'
      }
      fontSize={30}
    />
  </Group>
)
