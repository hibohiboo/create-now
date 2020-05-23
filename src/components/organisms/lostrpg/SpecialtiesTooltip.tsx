import React, { useState, useEffect } from 'react'
import { Box, Tooltip, InputLabel, ClickAwayListener } from '@material-ui/core'
import { Help } from '@material-ui/icons'

const SpecialtiesTooltip: React.FC<{ label: string; help: string }> = ({
  label,
  help,
}) => {
  // ToolTip State
  const [open, setOpen] = useState(false)
  const handleTooltipClose = () => {
    setOpen(false)
  }
  const handleTooltipOpen = () => {
    setOpen(true)
  }
  return (
    <ClickAwayListener onClickAway={handleTooltipClose}>
      <Box
        display="flex"
        alignItems="center"
        onClick={handleTooltipOpen}
        onMouseEnter={handleTooltipOpen}
        onMouseLeave={handleTooltipClose}
      >
        <InputLabel>{label}</InputLabel>
        <Tooltip
          PopperProps={{
            disablePortal: true,
          }}
          onClose={handleTooltipClose}
          open={open}
          disableFocusListener
          disableHoverListener
          disableTouchListener
          title={help}
          placement="bottom-end"
        >
          <Help />
        </Tooltip>
      </Box>
    </ClickAwayListener>
  )
}
export default SpecialtiesTooltip
