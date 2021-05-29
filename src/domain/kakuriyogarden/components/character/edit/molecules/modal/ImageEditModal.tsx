import { FC, useEffect, useState } from 'react'
import Modal from './Modal'
import ImageEdit from '../edit/ImageEdit'
import { ImageEditModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<ImageEditModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-input-modal">
        <div>{ctx.label}変更</div>
        <div style={{ cursor: 'pointer' }}>
          <ImageEdit
            label={ctx.label}
            prevUrl={ctx.url}
            onDrop={(event) => {
              ctx.dropHandler(event)
              ctx.closeHandler()
            }}
          />
        </div>
        <p>50×50pxの画像推奨</p>
      </div>
    </Modal>
  )
}
export default modal
