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
  title: string
  height: number
  width: number
  resizable: boolean
  draggable: boolean
  onResize: (size: { height: number; width: number }) => void
}> = ({
  children,
  title,
  height,
  width,
  onResize,
  resizable = false,
  draggable = false,
}) => {
  const classes = useStyles()
  const onResizeHandler = (event, { element, size, handle }) => {
    onResize(size)
  }
  const wrapperHeight = height
  const wrapperWidht = width
  const resizeHandles = resizable ? ['se', 'ne', 'e', 'n', 's'] : []

  return (
    <Resizable
      className="box"
      height={wrapperHeight}
      width={wrapperWidht}
      onResize={onResizeHandler}
      style={{ overflow: 'hidden' }}
      // resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
      // resizeHandles={['se']}
      resizeHandles={resizeHandles}
    >
      <PaperComponent
        style={{ width: `${wrapperWidht}px`, height: `${wrapperHeight}px` }}
      >
        {draggable ? (
          <AppBar position="static" id="draggable-dialog-title">
            <Toolbar variant="dense">
              <Typography variant="subtitle2" className={classes.title}>
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
        ) : (
          <></>
        )}

        <Box p={resizable ? 1 : 0}>{children}</Box>
      </PaperComponent>
    </Resizable>
  )
}
export default DraggablePanel
