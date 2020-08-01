import React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Paper, { PaperProps } from '@material-ui/core/Paper'
import Draggable from 'react-draggable'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { Resizable, ResizableBox } from 'react-resizable'

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
const DraggablePanel: React.FC = ({ children }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  const [height, setHeight] = React.useState(200)
  const [width, setWidth] = React.useState(200)
  const onResize = (event, { element, size, handle }) => {
    console.log(size)
    setHeight(size.height)
    setWidth(size.width)
  }
  return (
    <Resizable
      className="box"
      height={height}
      width={width}
      onResize={onResize}
      resizeHandles={['sw', 'se', 'nw', 'ne', 'w', 'e', 'n', 's']}
      style={{ overflow: 'hidden' }}
    >
      <PaperComponent style={{ width: `${width}px`, height: `${height}px` }}>
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
