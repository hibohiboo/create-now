import { FC } from 'react'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type { CardModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<CardModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-negai-modal">
        {ctx.card ? <Card cardData={ctx.card} /> : <div></div>}
      </div>
    </Modal>
  )
}
export default modal
