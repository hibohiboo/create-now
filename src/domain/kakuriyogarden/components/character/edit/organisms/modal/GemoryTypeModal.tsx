import { FC, Component, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { TextareaAutosize } from '@material-ui/core'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type {
  GadgetModal,
  GemoryTypeModal,
} from '~/domain/kakuriyogarden/store/character/modal'

import { getGemoryImage } from '~/domain/kakuriyogarden/classes/gemory'

const modal: FC<GemoryTypeModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-gadget-modal">
        <h3>想晶種別</h3>
        <p>焼き付いた記憶の分類。</p>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('死')}
        >
          <h3>死</h3>
          <img src={getGemoryImage('死')} />
          <p>得意魔法:攻撃。強く死を意識した記憶。親族の死、臨死体験など。</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('病')}
        >
          <h3>病</h3>
          <img src={getGemoryImage('病')} />
          <p>得意魔法:妨害、回復。自分、友人の病の記憶</p>
        </div>

        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('恐怖')}
        >
          <h3>恐怖</h3>
          <img src={getGemoryImage('恐怖')} />
          <p>得意魔法:妨害。事故や映画などでの恐怖や苦しみの記憶</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('戦い')}
        >
          <h3>戦い</h3>
          <img src={getGemoryImage('戦い')} />
          <p>
            得意魔法:強化、攻撃。カクリオニとの戦い、あるいはスポーツやゲームでの勝敗の記憶
          </p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('日常')}
        >
          <h3>日常</h3>
          <img src={getGemoryImage('日常')} />
          <p>
            得意魔法:強化。何でもない日々、友情を育んだ時間、小さな幸せの記憶
          </p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gemoryTypeHandler('愛')}
        >
          <h3>愛</h3>
          <img src={getGemoryImage('愛')} />
          <p>得意魔法:回復。恋愛、家族愛、生誕などの記憶</p>
        </div>
      </div>
    </Modal>
  )
}
export default modal
