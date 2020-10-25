import { FC, useState } from 'react'
import { Box, FormControl, TextareaAutosize, Button } from '@material-ui/core'
import DraggablePanel from '~/components/molecules/mui/DraggablePanel'
import type { ViewModel } from '~/store/modules/hakoniwaModule/viewModel/skills'
import SkillCard from '~/components/organisms/hakoniwa/SkillCard'
const CardList: FC<{
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
      title="カード一覧"
      width={chatWidth}
      height={chatHeight}
      onResize={onChatResize}
      resizable={true}
      draggable={true}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          height: '600px',
          overflow: 'scroll',
        }}
      >
        {vm.cards.map((card, index) => (
          <SkillCard
            cardData={card}
            key={index}
            onClick={() => vm.addSelectCard(card)}
          />
        ))}
      </div>
    </DraggablePanel>
  )
}
export default CardList
