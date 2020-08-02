import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Paper, { PaperProps } from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Resizable, ResizableBox } from 'react-resizable'
import { Box } from '@material-ui/core'
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
)

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  )
}
const DraggablePanel: React.FC<{
  height: number
  width: number
  onResize: (size: { height: number; width: number }) => void
}> = ({ children, height, width, onResize }) => {
  const classes = useStyles()
  const onResizeHandler = (event, { element, size, handle }) => {
    onResize(size)
  }
  const wrapperHeight = height
  const wrapperWidht = height
  return (
    <Resizable
      className="box"
      height={wrapperHeight}
      width={wrapperWidht}
      onResize={onResizeHandler}
      style={{ overflow: 'hidden' }}
      // resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
      resizeHandles={['se', 'e', 's']}
    >
      <PaperComponent
        style={{ width: `${wrapperWidht}px`, height: `${wrapperHeight}px` }}
      >
        <AppBar position="static" id="draggable-dialog-title">
          <Toolbar variant="dense">
            <Typography variant="subtitle2" className={classes.title}>
              ユドナリウム
            </Typography>
          </Toolbar>
        </AppBar>
        {children}
      </PaperComponent>
    </Resizable>
  )
}
export default DraggablePanel
