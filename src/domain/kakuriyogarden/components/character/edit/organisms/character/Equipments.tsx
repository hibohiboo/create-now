import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const component: FC<{}> = () => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '80px' }}>
        <span style={{}}>
          <ruby>魔装</ruby>
        </span>
        <img src="/images/kakuriyogarden/icons/game-icons/ample-dress.svg" />
      </div>
      <div className="kg-attributes">
        <div className="kg-attribute kg-editable">
          <div>アミュレット</div>
          <div>{`自身を対象とした、一節までの魔法を無効化する。`}</div>
        </div>
        <button style={{ padding: '5px', marginTop: '15px' }}>魔装追加</button>
      </div>
    </div>
  )
}
export default component
