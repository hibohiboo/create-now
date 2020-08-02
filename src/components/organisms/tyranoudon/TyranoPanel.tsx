import { useState, FC } from 'react'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

const TryranoPanel: FC = () => {
  const [height, setHeight] = useState(640)
  const [width, setWidth] = useState(800)
  const onResize = (size) => {
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <DraggablePanel
      title="ティラノ"
      width={width}
      height={height}
      onResize={onResize}
    >
      <iframe
        src="/lost-replay-1/index.html"
        width={`${width}px`}
        height={`${height}px`}
        scrolling="no"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </DraggablePanel>
  )
}
export default TryranoPanel
