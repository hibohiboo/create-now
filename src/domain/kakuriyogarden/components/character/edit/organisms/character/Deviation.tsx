import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const component: FC<{}> = () => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '60px' }}>
        <span style={{}}>
          <ruby>逸脱</ruby>
        </span>
        <img src="/images/kakuriyogarden/icons/game-icons/egg-eye.svg" />
      </div>
      <div>
        <table className="kg-table">
          <thead>
            <tr>
              <th>箇所</th>
              <th>変身前</th>
              <th>変身後</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>髪の長さ</td>
              <td>長髪</td>
              <td>短髪</td>
            </tr>
            <tr>
              <td>髪の色</td>
              <td>黒髪</td>
              <td>白メッシュ</td>
            </tr>
            <tr>
              <td>右頬</td>
              <td>火傷痕</td>
              <td>綺麗な肌</td>
            </tr>
            <tr>
              <td>怒りを</td>
              <td>溜め込む</td>
              <td>ブチキレる</td>
            </tr>
            <tr>
              <td>自信</td>
              <td>自己評価低</td>
              <td>高慢</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}
export default component
