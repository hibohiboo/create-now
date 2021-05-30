import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const component: FC<{}> = () => {
  return (
    <div className="kg-section">
      <div className="kg-section-title">
        <span style={{ paddingLeft: '10px' }}>解放度</span>
        <div className="flex-centering">
          <img src="/images/kakuriyogarden/icons/game-icons/breaking-chain.svg" />
        </div>
      </div>
      <div>
        <div className="kg-section-title">上限</div>
        <div style={{ fontSize: '2rem' }}>130</div>
      </div>
      <div>
        <div className="kg-section-title flex-centering">コスト</div>
        <div
          style={{
            fontSize: '1.8rem',
            paddingLeft: '20px',
            paddingTop: '5px',
          }}
        >
          100 / 130
        </div>
      </div>
    </div>
  )
}
export default component
