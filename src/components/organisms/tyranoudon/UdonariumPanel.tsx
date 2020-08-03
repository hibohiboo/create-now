import { useState, FC } from 'react'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

const UdonariumPanel: FC = () => {
  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(800)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <DraggablePanel
      title="ユドナリウム"
      width={width}
      height={height}
      onResize={onResize}
    >
      <iframe
        id="iframe-udonarium"
        src={process.env.UDONARIUM_URL}
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
