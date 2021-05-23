import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from '../atoms/MagicalName'

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
            console.log('img click')
            vm.openImageEditModal(
              'キャラクターアイコン',
              vm.character.prevUrl,
              vm.handleOnDrop,
            )
          }}
        >
          <img src={vm.character.prevUrl} />
        </div>
        <div className="kg-editable">{vm.character.profile}</div>
      </div>
    </SubPage>
  )
}
export default Item
