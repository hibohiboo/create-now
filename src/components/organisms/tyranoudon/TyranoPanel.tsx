import { useState, FC } from 'react'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import { CircularProgress } from '@material-ui/core'

const TryranoPanel: FC<{
  name: string
  defaultWidth: number
  defaultHeight: number
  sheet: string
  loaded: boolean
}> = ({ name, defaultWidth, defaultHeight, sheet, loaded = false }) => {
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
      resizable={true}
      draggable={true}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#000',
          position: 'absolute',
          zIndex: 10,
          display: loaded ? 'none' : 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            color: 'white',
            position: 'absolute',
            left: '10px',
            top: '10px',
          }}
        >
          準備中....
        </div>
        <CircularProgress />
      </div>
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
