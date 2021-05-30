import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const cloth: FC<{
  openInputModal: OpenInputModal
}> = ({ openInputModal }) => {
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
        onClick={() => {}}
      >
        {`手榴弾を模したキーホルダー。ピンを抜く動作をトリガーに、爆炎に包まれ変身する。
変身後の衣装は黒紫色のドレス。`}
      </div>
    </div>
  )
}
export default cloth
