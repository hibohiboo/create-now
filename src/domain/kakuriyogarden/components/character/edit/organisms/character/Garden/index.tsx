import { Dispatch, FC, useEffect, useState } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { Gemory, getGemoryImage } from '~/domain/kakuriyogarden/classes/gemory'
import { Magic, gemory } from '~/domain/kakuriyogarden/classes/gemory/magic'
import {
  getHopeImageUrl,
  getHopeMagic,
  Hope,
} from '~/domain/kakuriyogarden/classes/hope'
import { Character } from '~/domain/kakuriyogarden/store/character'
import {
  OpenCardListModal,
  OpenCardModal,
  OpenGemoryModal,
  OpenGemoryTypeModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'
import ImageArea from './ImageArea'
const component: FC<{
  cardList: Magic[]
  character: Character
  dispatch: Record<string, Dispatch<any>>
  openGemoryModal: OpenGemoryModal
  openInputModal: OpenInputModal
  openGemoryTypeModal: OpenGemoryTypeModal
  openCardModal: OpenCardModal
  openCardListModal: OpenCardListModal
}> = ({
  openGemoryModal,
  character,
  cardList,
  dispatch,
  openInputModal,
  openGemoryTypeModal,
  openCardModal,
  openCardListModal,
}) => {
  // SSRのときにImageAreaの見た目が違うと怒られるので対応
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return <></>
  }
  const { hope, garden } = character
  return (
    <>
      <div className="kg-section">
        <div className="kg-section-title" style={{ width: '100px' }}>
          <span style={{}}>
            <ruby>
              心象庭園<rt>ガーデン</rt>
            </ruby>
          </span>
          <img src="/images/kakuriyogarden/icons/game-icons/field.svg" />
        </div>
        <div>
          <div>
            <button
              style={{ padding: '5px', marginTop: '5px', marginBottom: '10px' }}
              onClick={() => {
                dispatch.garden([
                  {
                    description: `心象風景。`,
                    strength: 1,
                    type: '戦い',
                    episode: `強く記憶に焼き付いた光景`,
                    cards: [null],
                  },
                  ...garden,
                ])
              }}
            >
              想晶追加
            </button>
            <button
              style={{
                padding: '5px',
                marginTop: '5px',
                marginBottom: '10px',
                marginLeft: '50px',
              }}
              onClick={() => {
                if (!confirm('第一層を削除します。よろしいですか？')) {
                  return
                }
                const [, ...rest] = garden
                dispatch.garden(rest)
              }}
            >
              想晶削除
            </button>
          </div>
          <div className="kg-garden">
            {garden.map((item, i) => (
              <div className="kg-garden-layer" key={i}>
                <div
                  className={`kg-garden-layer-first ${'kg-editable'}`}
                  style={{
                    backgroundImage: item
                      ? `url('${getGemoryImage(item.type)}' )`
                      : '',
                    backgroundSize: 'contain',
                  }}
                  onClick={() =>
                    openGemoryModal(
                      garden,
                      item,
                      dispatch,
                      openInputModal,
                      openGemoryTypeModal,
                      i,
                    )
                  }
                >
                  <span
                    style={{
                      backgroundColor: '#eee',

                      color: 'black',
                      fontSize: '12px',
                    }}
                  >
                    {i + 1}層
                  </span>
                  <br />
                </div>
                {item.cards.map((c, j) =>
                  j === 0 ? (
                    <div
                      className={`kg-garden-layer-col `}
                      key={`${i}${j}`}
                      style={{
                        backgroundColor: 'darkmagenta',
                        cursor: 'pointer',
                      }}
                      onClick={() =>
                        openCardModal({
                          ...c,
                          effect: `種別:${item.type}。強度:${item.strength}`,
                        })
                      }
                    >
                      <img src="/images/kakuriyogarden/icons/game-icons/crystal-growth.svg" />
                    </div>
                  ) : (
                    <div
                      className={`kg-garden-layer-col ${'kg-editable'}`}
                      key={`${i}${j}`}
                      style={{ backgroundColor: 'darkmagenta' }}
                      onClick={() => {
                        openCardListModal(c, cardList, (selectedCard) => {
                          dispatch.garden(
                            garden.map((gx, gi) =>
                              gi === i
                                ? {
                                    ...gx,
                                    cards: gx.cards.map((gy, gj) =>
                                      gj === j ? selectedCard : gy,
                                    ),
                                  }
                                : gx,
                            ),
                          )
                        })
                      }}
                    >
                      {c ? <img src={c.image.url} /> : <></>}
                    </div>
                  ),
                )}
              </div>
            ))}
            <div className="kg-garden-layer">
              <div
                className={`kg-garden-layer-first `}
                style={{
                  backgroundImage: `url('${getHopeImageUrl(hope)}' )`,
                  backgroundSize: 'contain',
                }}
              >
                <span
                  style={{
                    backgroundColor: '#eee',
                    color: 'black',
                    fontSize: '12px',
                  }}
                >
                  {garden.length + 1}層
                </span>
              </div>
              <div
                className="kg-garden-layer-col"
                style={{ backgroundColor: 'darkmagenta', cursor: 'pointer' }}
                onClick={() =>
                  openCardModal({
                    ...gemory,
                    effect: `種別:願い。強度:2`,
                  })
                }
              >
                <img src="/images/kakuriyogarden/icons/game-icons/crystal-growth.svg" />
              </div>
              <div
                className="kg-garden-layer-col"
                style={{ backgroundColor: 'darkmagenta', cursor: 'pointer' }}
                onClick={() => openCardModal(getHopeMagic(hope))}
              >
                <img src={getHopeImageUrl(hope)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-centering">
        <ImageArea gardenItems={garden} hope={hope} color={`darkmagenta`} />
      </div>
    </>
  )
}
export default component
