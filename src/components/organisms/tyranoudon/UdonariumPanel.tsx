import { useState, FC } from 'react'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

const UdonariumPanel: FC<{ is2d?: boolean }> = ({ is2d }) => {
  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(700)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  const src = is2d
    ? `${process.env.UDONARIUM_URL}?2d=true`
    : process.env.UDONARIUM_URL
  return (
    <DraggablePanel
      title="ユドナリウム"
      width={width}
      height={height}
      onResize={onResize}
    >
      <iframe
        id="iframe-udonarium"
        src={src}
        width={`${width}px`}
        height={`${height}px`}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </DraggablePanel>
  )
}
export default UdonariumPanel
