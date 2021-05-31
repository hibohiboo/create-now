import { Dispatch, FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const cloth: FC<{
  gadgetDetail: string
  setGadgetDetail: Dispatch<string>
  openInputModal: OpenInputModal
}> = ({ gadgetDetail, openInputModal, setGadgetDetail }) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title">
        <span style={{ paddingLeft: '10px' }}>
          <ruby>
            焦点具<rt>ガジェット</rt>
          </ruby>
        </span>
        <div className="flex-centering">
          <img src="/images/kakuriyogarden/icons/game-icons/pendant-key.svg" />
        </div>
      </div>
      <div
        className="kg-section-title"
        onClick={() => {}}
        style={{ cursor: 'pointer' }}
      >
        <span className="kg-editable" style={{ paddingLeft: '5px' }}>
          <ruby>
            {'武器'}
            <rt>モチーフ</rt>
          </ruby>
        </span>
        <div>
          <img src={getGadgetImageUrl('武器')} />
        </div>
      </div>
      <div
        className="kg-detail-area kg-editable"
        style={{ flex: 1 }}
        onClick={() =>
          openInputModal(
            '焦点具と魔法戦衣の説明',
            gadgetDetail,
            setGadgetDetail,
            true,
          )
        }
      >
        {gadgetDetail}
      </div>
    </div>
  )
}
export default cloth
