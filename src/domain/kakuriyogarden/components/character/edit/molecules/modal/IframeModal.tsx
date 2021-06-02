import { FC } from 'react'
import Modal from './Modal'
import type { IframeModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<IframeModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-input-modal">
        <iframe src={ctx.url}></iframe>
        <div className="kg-button-wrapper">
          <button onClick={ctx.closeHandler}>閉じる</button>
        </div>
      </div>
    </Modal>
  )
}
export default modal
