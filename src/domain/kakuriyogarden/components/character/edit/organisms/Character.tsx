import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from './character/MagicalName'
import Profile from './character/Profile'
import Hope from './character/Hope'
import Cloth from './character/Cloth'
import Openness from './character/Openness'
import Attributes from './character/Attributes'

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
      <div>
        <span className="tag">戦闘未経験</span>
        <span className="tag">火</span>
      </div>
      <Profile
        imageUrl={vm.character.imageUrl}
        openImageEditModal={vm.openImageEditModal}
        handleOnDrop={vm.handleOnDrop}
        openInputModal={vm.openInputModal}
        profile={vm.character.profile}
        setProfile={vm.setProfile}
      />
      <Hope
        setHopeDetail={vm.setHopeDetail}
        hopeDetail={vm.character.hopeDetail}
        openInputModal={vm.openInputModal}
        hope={vm.character.hope}
        openNegaiModal={vm.openNegaiModal}
        setHope={vm.setHope}
      />
      <Cloth openInputModal={vm.openInputModal} />
      <Openness />
      <Attributes />
    </SubPage>
  )
}
export default Item
