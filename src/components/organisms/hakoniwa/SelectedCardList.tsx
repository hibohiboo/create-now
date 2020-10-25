import React, { FC, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import CancelIcon from '@material-ui/icons/Cancel'
import DraftsIcon from '@material-ui/icons/Drafts'

import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import type { ViewModel } from '~/store/modules/hakoniwaModule/viewModel/skills'
import SkillCard from '~/components/organisms/hakoniwa/SkillCard'

const SelectedCardList: FC<{
  width: number
  height: number
  vm: ViewModel
}> = ({ vm, width, height }) => {
  const [chatHeight, setChatHeight] = useState(height)
  const [chatWidth, setChatWidth] = useState(width)
  const onChatResize = (size) => {
    setChatHeight(size.height)
    setChatWidth(size.width)
  }

  return (
    <DraggablePanel
      title="選択中のカード"
      width={chatWidth}
      height={chatHeight}
      onResize={onChatResize}
      resizable={true}
      draggable={true}
    >
      <List component="nav" aria-label="main mailbox folders">
        {vm.selectedCards.map((card) => (
          <ListItem
            button
            key={card.uid}
            onClick={() => vm.deleteSelectedCard(card.uid)}
          >
            <ListItemIcon>
              <CancelIcon />
            </ListItemIcon>
            <ListItemText primary={card.name} />
          </ListItem>
        ))}
      </List>
    </DraggablePanel>
  )
}
export default SelectedCardList
