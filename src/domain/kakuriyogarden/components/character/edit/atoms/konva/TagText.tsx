import { FC } from 'react'
import { Stage, Layer, Rect, Text, Ellipse } from 'react-konva'
const ImageArea: FC<{ text: string; y: number; x: number }> = ({
  text,
  y,
  x,
}) => {
  return (
    <>
      <Rect
        x={x}
        y={y}
        width={text.length * 12 + 10}
        height={15}
        fill={'teal'}
        stroke={'teal'}
        strokeWidth={1}
        cornerRadius={5}
      />
      <Text
        x={x + 5}
        y={y + 3}
        text={text}
        fill={'white'}
        fontSize={12}
        // lineHeight={2.1}
        // cornerRadius={5}
      />
    </>
  )
}
export default ImageArea
