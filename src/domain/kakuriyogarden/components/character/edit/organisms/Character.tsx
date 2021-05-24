import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from './character/MagicalName'
import Profile from './character/Profile'

const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
    <SubPage id="cloth">
      <MagicalName
        symbolName={vm.character.symbolName}
        magicalName={vm.character.magicalName}
        symbolNameKana={vm.character.symbolNameKana}
        setSymbolName={vm.setSymbolName}
        setSymbolNameKana={vm.setSymbolNameKana}
        setMagicalName={vm.setMagicalName}
        openInputModal={vm.openInputModal}
      />
      <Profile
        imageUrl={vm.character.imageUrl}
        openImageEditModal={vm.openImageEditModal}
        handleOnDrop={vm.handleOnDrop}
        openInputModal={vm.openInputModal}
        profile={vm.character.profile}
        setProfile={vm.setProfile}
      />
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
        <div className="kg-detail-area" style={{ flex: 1 }}>
          test
        </div>
      </div>
    </SubPage>
  )
}
export default Item
