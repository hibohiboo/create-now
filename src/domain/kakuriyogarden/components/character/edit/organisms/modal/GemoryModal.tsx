import { FC, Component, useEffect, useState } from 'react'
import { getGemoryImage } from '~/domain/kakuriyogarden/classes/gemory'
import Modal from '~/domain/kakuriyogarden/components/character/edit/molecules/modal/Modal'
import type { GemoryModal } from '~/domain/kakuriyogarden/store/character/modal'
import Ruby from '~/domain/kakuriyogarden/components/character/edit/atoms/RubyText'

const modal: FC<GemoryModal> = (ctx) => {
  const { gemory } = ctx
  const [description, setDescrption] = useState(gemory.description)
  const [strength, setStrength] = useState(gemory.strength)
  useEffect(() => {
    setDescrption(gemory.description)
    setStrength(gemory.strength)
  }, [gemory])

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
            <div
              style={{ fontSize: '2rem' }}
              className="kg-editable"
              onClick={() =>
                ctx.openInputModal(
                  '強度',
                  String(strength),
                  (text) => {
                    const num = Number(text)
                    if (num < 1) {
                      setStrength(1)
                      return
                    }
                    setStrength(num)
                    // 強度がカードの枚数より増えたら増やす。減っていたら減らす
                    if (gemory.cards.length < num) {
                      ctx.dispatch.garden(
                        ctx.garden.map((x, i) =>
                          i === ctx.index
                            ? {
                                ...x,
                                strength: num,
                                cards: gemory.cards.concat(
                                  Array(num - gemory.cards.length).fill(null),
                                ),
                              }
                            : x,
                        ),
                      )
                      return
                    }
                    const cards = [...gemory.cards]
                    cards.length = num

                    ctx.dispatch.garden(
                      ctx.garden.map((x, i) =>
                        i === ctx.index ? { ...x, strength: num, cards } : x,
                      ),
                    )
                  },
                  'number',
                )
              }
            >
              {strength}
            </div>
          </div>
        </div>
        <h4>風景</h4>
        <div
          className="kg-detail-area kg-editable"
          onClick={() =>
            ctx.openInputModal(
              '風景',
              description,
              (text) => {
                setDescrption(text)
                ctx.dispatch.garden(
                  ctx.garden.map((x, i) =>
                    i === ctx.index ? { ...x, description: text } : x,
                  ),
                )
              },
              'textarea',
            )
          }
        >
          <Ruby text={description} />
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
