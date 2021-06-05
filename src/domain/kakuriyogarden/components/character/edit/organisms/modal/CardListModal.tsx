import { FC } from 'react'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type { CardListModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<CardListModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div>
        {ctx.card ? (
          <div>
            <strong>配置中</strong>
            <div
              style={{
                transform: 'scale(0.7,0.7)',
                transformOrigin: 'top right',
                height: '30vh',
              }}
            >
              <Card cardData={ctx.card} />
            </div>
            <button
              style={{ padding: '5px', marginLeft: '5px' }}
              onClick={() => {
                ctx.dispatchHandler(null)
                ctx.closeHandler()
              }}
            >
              取り外す
            </button>
            <hr></hr>
          </div>
        ) : (
          <div></div>
        )}
        <strong>魔法選択</strong>
        <div style={{ overflow: 'auto', maxHeight: '50vh' }}>
          {ctx.cardList.map((card) => (
            <div
              onClick={() => {
                ctx.dispatchHandler(card)
                ctx.closeHandler()
              }}
            >
              <Card cardData={card} />
            </div>
          ))}
        </div>
      </div>
    </Modal>
  )
}
export default modal
