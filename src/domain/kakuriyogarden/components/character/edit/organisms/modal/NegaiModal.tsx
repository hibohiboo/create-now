import { FC, Component, useEffect, useState } from 'react'
import Slider from 'react-slick'
import { TextareaAutosize } from '@material-ui/core'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

import type { InputModal } from '~/domain/kakuriyogarden/store/character/modal'

const modal: FC<{ show: boolean; closeHandler: any }> = (ctx) => {
  return (
    <Modal show={ctx.show} closeHandler={ctx.closeHandler}>
      <div className="kg-negai-modal">
        <SimpleSlider />
      </div>
    </Modal>
  )
}
export default modal
class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <div>
        <h2>願い選択</h2>
        <Slider {...settings}>
          <div className="kg-modal-hope">
            <h3>献身</h3>
            <img src="/images/kakuriyogarden/icons/game-icons/heart-wings.svg" />
            <p>あなたは誰かのために願った。</p>
            <div className="kg-modal-hope-skill">
              <Card
                cardData={{
                  type: '小奇跡',
                  kind: '献身',
                  nameKana: 'ホーリーヒール',
                  name: '献身の癒し',
                  timing: 'アクション',
                  count: '6',
                  target: '単体',
                  range: '近接状態',
                  tags: ['治癒', '詠唱'],
                  effect:
                    '想晶1つの耐久度を最大値まで回復する。それが破壊されていれば修復する。シナリオ1回。',
                  gardeneffect: 'ラウンド終了時に1点回復。',
                  description: '清浄な光を湛えた泉。',
                  id: '',
                  image: {
                    url:
                      '/images/kakuriyogarden/icons/game-icons/heart-wings.svg',
                    source: 'Game-icons.net',
                    sourceUrl:
                      'https://game-icons.net/1x1/delapouite/heart-wings.html',
                  },
                  maxLevel: 1,
                  successRate: '100%',
                  level: 1,
                  exp: 0,
                }}
              />
            </div>
          </div>
          <div className="kg-modal-hope">
            <h3>利己</h3>
            <img src="/images/kakuriyogarden/icons/game-icons/rainbow-star.svg" />
            <p>あなたは己のために願った。</p>
            <div className="kg-modal-hope-skill">
              <Card
                cardData={{
                  type: '小奇跡',
                  kind: '利己',
                  nameKana: 'シューティングスター',
                  name: '利己的な流星',
                  timing: 'アクション',
                  count: '6',
                  target: '単体',
                  range: '20',
                  tags: ['攻撃', '詠唱'],
                  effect: '対象の想晶1つを破壊する。シナリオ1回。',
                  gardeneffect: '"利己的な流星"を即唱で使用できる',
                  description: '天に輝く一等星。',
                  id: '',
                  image: {
                    url:
                      '/images/kakuriyogarden/icons/game-icons/rainbow-star.svg',
                    source: 'Game-icons.net',
                    sourceUrl:
                      'https://game-icons.net/1x1/delapouite/rainbow-star.html',
                  },
                  maxLevel: 1,
                  successRate: '100%',
                  level: 1,
                  exp: 0,
                }}
              />
            </div>
          </div>

          <div className="kg-modal-hope">
            <h3>復讐</h3>
            <img src="/images/kakuriyogarden/icons/game-icons/spark-spirit.png" />
            <p>己のための奇跡は不要。ただただ報いを願うのみ。</p>
            <div className="kg-modal-hope-skill">
              <Card
                cardData={{
                  type: '小奇跡',
                  kind: '復讐',
                  name: '復讐の炎',
                  timing: 'ダメージ',
                  count: '6',
                  target: '単体',
                  range: '近接状態',
                  tags: ['攻撃', '即唱'],
                  effect:
                    '自身が受けたダメージと同じ値の軽減不可ダメージを対象に与える。シナリオ1回。',
                  gardeneffect: '与えるダメージ+1。受けるダメージ+1。',
                  description: '昏く燃え盛る炎。',
                  id: '',
                  image: {
                    url:
                      '/images/kakuriyogarden/icons/game-icons/spark-spirit.png',
                    source: 'Game-icons.net',
                    sourceUrl:
                      'https://game-icons.net/1x1/lorc/spark-spirit.html',
                  },
                  maxLevel: 1,
                  successRate: '100%',
                  level: 1,
                  exp: 0,
                  nameKana: 'アベンジャー',
                }}
              />
            </div>
          </div>
        </Slider>
      </div>
    )
  }
}
