import { FC } from 'react'
import {
  OpenImageEditModal,
  OpenInputModal,
} from '~/domain/kakuriyogarden/store/character/modal'

const Hope: FC<{
  hopeDetail: string
  setHopeDetail: any
  openInputModal: OpenInputModal
}> = ({ openInputModal, setHopeDetail, hopeDetail }) => {
  return (
    <div className="kg-negai">
      <div className="kg-negai-title">
        <span style={{ paddingLeft: '10px' }}>願い</span>
        <div>
          <img src="/images/kakuriyogarden/icons/human-pictogram/play.png" />
        </div>
      </div>
      <div className="kg-negai-title">
        <span className="kg-editable" style={{ paddingLeft: '5px' }}>
          復讐
        </span>
        <div>
          <img src="/images/kakuriyogarden/icons/game-icons/spark-spirit.png" />
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
export default Hope
