import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { getHopeImageUrl } from '~/domain/kakuriyogarden/classes/hope'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const component: FC<{}> = () => {
  return (
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
        <div className="kg-garden">
          {[
            {
              description: '風景',
              strength: 3,
              image: { url: '' },
              cols: [{}, {}, {}, {}],
            },
            {
              description: '風景',
              strength: 2,
              image: { url: '' },
              cols: [{}, {}, {}],
            },
            {
              description: '風景',
              strength: 1,
              image: { url: getHopeImageUrl('復讐') },
              cols: [{}, {}],
            },
          ].map((item, i) => (
            <div className="kg-garden-layer" key={i}>
              <div
                className="kg-garden-layer-first"
                style={{
                  backgroundImage: `url('${item.image.url}' )`,
                  backgroundSize: 'contain',
                }}
              >
                {i + 1}層
              </div>
              {item.cols.map((c, j) => (
                <div
                  className="kg-garden-layer-col"
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
  )
}
export default component
