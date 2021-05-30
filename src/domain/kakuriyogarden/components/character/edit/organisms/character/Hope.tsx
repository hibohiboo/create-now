import { FC } from 'react'
import { getHopeImageUrl } from '~/domain/kakuriyogarden/classes/hope'
import {
  OpenInputModal,
  OpenNegaiModal,
} from '~/domain/kakuriyogarden/store/character/modal'
import type { Hope } from '~/domain/kakuriyogarden/classes/hope'

const hope: FC<{
  hopeDetail: string
  hope: Hope
  setHope: any
  setHopeDetail: any
  openInputModal: OpenInputModal
  openNegaiModal: OpenNegaiModal
}> = ({
  openInputModal,
  openNegaiModal,
  setHope,
  hope,
  setHopeDetail,
  hopeDetail,
}) => {
  return (
    <div className="kg-section">
      <div className="kg-section-title">
        <span style={{ paddingLeft: '10px' }}>願い</span>
        <div>
          <img src="/images/kakuriyogarden/icons/human-pictogram/play.png" />
        </div>
      </div>
      <div
        className="kg-section-title"
        onClick={() => openNegaiModal(hope, setHope)}
        style={{ cursor: 'pointer' }}
      >
        <span className="kg-editable" style={{ paddingLeft: '5px' }}>
          {hope}
        </span>
        <div>
          <img src={getHopeImageUrl(hope)} />
        </div>
      </div>
      <div
        className="kg-detail-area kg-editable"
        style={{ flex: 1 }}
        onClick={() =>
          openInputModal('願いの詳細', hopeDetail, setHopeDetail, true)
        }
      >
        {hopeDetail}
      </div>
    </div>
  )
}
export default hope
