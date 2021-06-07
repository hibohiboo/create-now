import { FC } from 'react'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
const ImageArea: FC<{ width: number; height: number }> = ({
  width,
  height,
}) => {
  return (
    <Rect
      x={0}
      y={0}
      width={width}
      height={height}
      fill={'white'}
      stroke={'black'}
      strokeWidth={1}
      cornerRadius={10}
    />
  )
}
export default ImageArea
