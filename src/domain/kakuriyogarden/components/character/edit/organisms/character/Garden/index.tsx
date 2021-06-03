import { FC, useEffect, useState } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { Gemory } from '~/domain/kakuriyogarden/classes/gemory'
import { getHopeImageUrl, Hope } from '~/domain/kakuriyogarden/classes/hope'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import ImageArea from './ImageArea'
const component: FC<{ hope: Hope; gardenItems: (Gemory | null)[] }> = ({
  hope,
  gardenItems,
}) => {
  // SSRのときにImageAreaの見た目が違うと怒られるので対応
  const [showChild, setShowChild] = useState(false)
  useEffect(() => {
    setShowChild(true)
  }, [])
  if (!showChild) {
    return <></>
  }

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
              onClick={() => {}}
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
              }}
            >
              想晶削除
            </button>
          </div>
          <div className="kg-garden">
            {gardenItems.map((item, i) => (
              <div className="kg-garden-layer" key={i}>
                <div
                  className={`kg-garden-layer-first ${'kg-editable'}`}
                  style={{
                    backgroundImage: item ? `url('${item.type}' )` : '',
                    backgroundSize: 'contain',
                  }}
                >
                  {i + 1}層
                </div>
                {item.cards.map((c, j) => (
                  <div
                    className={`kg-garden-layer-col ${
                      j === 0 ? '' : 'kg-editable'
                    }`}
                    key={`${i}${j}`}
                    style={{ backgroundColor: 'darkmagenta' }}
                  >
                    <img src="/images/kakuriyogarden/icons/game-icons/crystal-growth.svg" />
                  </div>
                ))}
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
                {gardenItems.length + 1}層
              </div>
              <div
                className="kg-garden-layer-col"
                style={{ backgroundColor: 'darkmagenta' }}
              >
                <img src="/images/kakuriyogarden/icons/game-icons/crystal-growth.svg" />
              </div>
              <div
                className="kg-garden-layer-col"
                style={{ backgroundColor: 'darkmagenta' }}
              >
                <img src={getHopeImageUrl(hope)} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-centering">
        <ImageArea
          gardenItems={gardenItems}
          hope={hope}
          color={`darkmagenta`}
        />
      </div>
    </>
  )
}
export default component
