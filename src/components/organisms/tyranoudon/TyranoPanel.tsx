import { useState, FC } from 'react'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'

const TryranoPanel: FC<{
  name: string
  defaultWidth: number
  defaultHeight: number
  sheet: string
}> = ({ name, defaultWidth, defaultHeight, sheet }) => {
  const [height, setHeight] = useState(defaultHeight)
  const [width, setWidth] = useState(defaultWidth)
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
        id={`iframe-tyrano-${name}`}
        src={`/tyrano/chatwindow/${name}?sheet=${sheet}`}
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
