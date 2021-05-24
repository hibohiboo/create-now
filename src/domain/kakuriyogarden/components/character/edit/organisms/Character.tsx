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
    </SubPage>
  )
}
export default Item
