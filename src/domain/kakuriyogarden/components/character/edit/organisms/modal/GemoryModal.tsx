import { FC, Component, useEffect, useState } from 'react'
import { getGemoryImage } from '~/domain/kakuriyogarden/classes/gemory'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import type { GemoryModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'

const modal: FC<GemoryModal> = (ctx) => {
  const { gemory } = ctx
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-gemory-modal">
        <h3>想晶</h3>
        <p>心に強く焼き付いている記憶の結晶。魔法の源。</p>
        <div style={{ display: 'flex' }}>
          <div>
            <h4>種別:{gemory.type}</h4>
            <img
              src={getGemoryImage(gemory.type)}
              style={{ width: '50px', height: '50px' }}
            />
          </div>
          <div style={{ marginLeft: '20px' }}>
            <h4>強度</h4>
            <div style={{ fontSize: '2rem' }}>{gemory.strength}</div>
          </div>
        </div>
        <h4>風景</h4>
        <div className="kg-detail-area">
          <Ruby text={gemory.description} />
        </div>
        <h4>エピソード</h4>
        <div className="kg-detail-area">
          <Ruby text={gemory.episode} />
        </div>
      </div>
    </Modal>
  )
}
export default modal
