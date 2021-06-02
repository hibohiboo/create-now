import { FC, Component, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { TextareaAutosize } from '@material-ui/core'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type { GadgetModal } from '~/domain/kakuriyogarden/store/character/modal'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'

const modal: FC<GadgetModal> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-gadget-modal">
        <h3>焦点具</h3>
        <p>
          <ruby>
            魔法戦衣<rt>クロス</rt>
          </ruby>
          のモチーフ。モチーフを模した小物が変身アイテムとなる。魔法少女に適したモチーフが選ばれ、{' '}
          得意とする魔法の傾向が決まる。
        </p>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gadgetHandler('武器')}
        >
          <h3>武器</h3>
          <img src={getGadgetImageUrl('武器')} />
          <p>得意魔法:攻撃。ナイフ、銃、剣型の首飾りなど</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gadgetHandler('仮面')}
        >
          <h3>仮面</h3>
          <img src={getGadgetImageUrl('仮面')} />
          <p>得意魔法:防御。仮面、眼鏡、口紅、マニキュアなど</p>
        </div>

        <div className="kg-modal-hope" onClick={() => ctx.gadgetHandler('鎖')}>
          <h3>鎖</h3>
          <img src={getGadgetImageUrl('鎖')} />
          <p>得意魔法:妨害。リボン、チェーン、注連縄、ベルト、首輪など</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gadgetHandler('生物')}
        >
          <h3>生物</h3>
          <img src={getGadgetImageUrl('生物')} />
          <p>得意魔法:強化。獣、魚、昆虫、爬虫類、牙、爪、尻尾など</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gadgetHandler('自然')}
        >
          <h3>自然</h3>
          <img src={getGadgetImageUrl('自然')} />
          <p>得意魔法:回復。太陽、海、花、草など</p>
        </div>
        <div
          className="kg-modal-hope"
          onClick={() => ctx.gadgetHandler('歯車')}
        >
          <h3>歯車</h3>
          <img src={getGadgetImageUrl('歯車')} />
          <p>時計、オルゴールなど。</p>
        </div>
      </div>
    </Modal>
  )
}
export default modal
