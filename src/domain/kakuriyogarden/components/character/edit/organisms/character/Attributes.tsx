import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

const component: FC<{}> = () => {
  return (
    <div className="kg-section">
      <div className="kg-section-title" style={{ width: '200px' }}>
        <span style={{}}>
          <ruby>
            属性<rt>アトリビュート</rt>
          </ruby>
        </span>
        <div className="flex-centering">
          <img
            src="/images/kakuriyogarden/icons/icooon/license.svg"
            style={{
              backgroundColor: '#000',
              paddingLeft: '5px',
              paddingRight: '5px',
            }}
          />
        </div>
      </div>
      <div className="kg-attributes">
        <div className="kg-attribute kg-editable">
          <div>名乗り</div>
          <div>
            {`解放度+30。戦闘開始時に魔法少女としての名を名乗る誓約により解放度を高める。
  「灰花のユキスミレ。真っ白な灰に燃やし尽くしてあげる」`}
          </div>
        </div>
        <div className="kg-attribute kg-editable">
          <div>先天属性:火</div>
          <div>{`火タグを持つ魔法のカウント -1 (最低1)。`}</div>
        </div>
        <div className="kg-attribute kg-editable">
          <div>魔装獲得:お守り</div>
          <div>{`アミュレットを取得。`}</div>
        </div>
        {/* <button style={{ padding: '5px', marginTop: '15px' }}>属性追加</button> */}
      </div>
    </div>
  )
}
export default component
