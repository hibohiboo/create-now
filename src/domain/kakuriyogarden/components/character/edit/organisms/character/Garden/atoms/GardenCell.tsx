import React from 'react'
import { Group, Rect, Text } from 'react-konva'
import URLImage from './CellImage'
const cellSize = 50
type Args = { x: number; y: number; color: string; image: string | null }
export default ({ x, y, color, image }: Args) => (
  <Group x={x} y={y}>
    <Rect
      width={cellSize}
      height={cellSize}
      fill={color}
      stroke={'black'}
      strokeWidth={2}
    />
    {image ? <URLImage src={image} x={10} y={10} scale={1} size={30} /> : <></>}
  </Group>
)
