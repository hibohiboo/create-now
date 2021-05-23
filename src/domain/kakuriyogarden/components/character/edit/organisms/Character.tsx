import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from './character/MagicalName'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'

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
      <div className="kg-profile">
        <div
          className="kg-editable"
          onClick={() => {
            vm.openImageEditModal(
              'キャラクターアイコン',
              vm.character.prevUrl,
              vm.handleOnDrop,
            )
          }}
        >
          <img src={vm.character.prevUrl} />
        </div>
        <div
          className="kg-editable"
          onClick={() =>
            vm.openInputModal('設定', vm.character.profile, vm.setProfile, true)
          }
        >
          {vm.character.profile}
        </div>
      </div>
    </SubPage>
  )
}
export default Item
