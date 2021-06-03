import { FC, useEffect, useState } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { getHopeImageUrl } from '~/domain/kakuriyogarden/classes/hope'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import ImageArea from './ImageArea'
const component: FC<{}> = () => {
  // SSRのときにImageAreaの見た目が違うと怒られるので対応
  const [showChild, setShowChild] = useState(false)
  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true)
  }, [])

  if (!showChild) {
    // You can show some kind of placeholder UI here
    return <></>
  }
  const gardenItems = [
    {
      description: '風景',
      strength: 3,
      image: { url: '' },
      cols: [{}, {}, {}, {}, {}],
    },
    {
      description: '風景',
      strength: 2,
      image: { url: getHopeImageUrl('献身') },
      cols: [{}, {}, {}],
    },
    {
      description: '風景',
      strength: 1,
      image: { url: getHopeImageUrl('復讐') },
      cols: [{}, {}],
    },
  ]
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
                  className={`kg-garden-layer-first ${
                    i === gardenItems.length - 1 ? '' : 'kg-editable'
                  }`}
                  style={{
                    backgroundImage: `url('${item.image.url}' )`,
                    backgroundSize: 'contain',
                  }}
                >
                  {i + 1}層
                </div>
                {item.cols.map((c, j) => (
                  <div
                    className="kg-garden-layer-col kg-editable"
                    key={`${i}${j}`}
                    style={{ backgroundColor: 'darkmagenta' }}
                  >
                    <img src="/images/kakuriyogarden/icons/game-icons/crystal-growth.svg" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-centering">
        <ImageArea gardenItems={gardenItems} color={`darkmagenta`} />
      </div>
    </>
  )
}
export default component
