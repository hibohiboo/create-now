import { FC } from 'react'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type { CardListModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<CardListModal> = (ctx) => {
  console.log('ttt', ctx)
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div>
        {ctx.card ? (
          <div>
            <strong>配置中</strong>
            <div
              style={{
                transform: 'scale(0.5,0.5)',
                transformOrigin: 'top',
                height: '25vh',
              }}
            >
              <Card cardData={ctx.card} />
            </div>

            <hr></hr>
          </div>
        ) : (
          <div></div>
        )}
        <strong>魔法選択</strong>
        <div style={{ overflow: 'auto', maxHeight: '50vh' }}>
          {ctx.cardList.map((card) => (
            <Card cardData={card} />
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default modal
