import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from './character/MagicalName'
import Profile from './character/Profile'
import Hope from './character/Hope'
import Gadget from './character/Gadget'
import Openness from './character/Openness'
import Attributes from './character/Attributes'
import Equipments from './character/Equipments'
import Deviation from './character/Deviation'
import Garden from './character/Garden/index'
import { Magic } from '~/domain/kakuriyogarden/classes/gemory/magic'
import CharacterCard from './images/CharacterCardImage'
import Cards from './character/Cards'

const Item: FC<{ vm: CharacterViewModel; cardList: Magic[] }> = ({
  vm,
  cardList,
}) => {
  return (
    <SubPage id="cloth">
      <div
        className="kg-editable"
        onClick={() =>
          vm.openInputModal(
            'プレイヤー名',
            vm.character.playerName,
            vm.characterDispatch.playerName,
          )
        }
        style={{ textAlign: 'right' }}
      >
        {vm.character.playerName}
      </div>
      <MagicalName
        symbolName={vm.character.symbolName}
        magicalName={vm.character.magicalName}
        symbolNameKana={vm.character.symbolNameKana}
        setSymbolName={vm.characterDispatch.symbolName}
        setSymbolNameKana={vm.characterDispatch.symbolNameKana}
        setMagicalName={vm.characterDispatch.magicalName}
        openInputModal={vm.openInputModal}
      />
      <div
        className="kg-editable"
        onClick={() =>
          vm.openInputModal(
            'タグ',
            vm.character.tags,
            vm.characterDispatch.tags,
          )
        }
      >
        {vm.character.tags.split(',').map((t, i) => (
          <span className="tag" key={i}>
            {t}
          </span>
        ))}
      </div>

      <Profile
        imageUrl={vm.character.imageUrl}
        openImageEditModal={vm.openImageEditModal}
        handleOnDrop={vm.handleOnDrop}
        openInputModal={vm.openInputModal}
        profile={vm.character.profile}
        setProfile={vm.characterDispatch.profile}
      />
      <Hope
        setHopeDetail={vm.characterDispatch.hopeDetail}
        hopeDetail={vm.character.hopeDetail}
        openInputModal={vm.openInputModal}
        hope={vm.character.hope}
        openNegaiModal={vm.openNegaiModal}
        setHope={vm.characterDispatch.hope}
      />
      <Gadget
        gadget={vm.character.gadget}
        setGadget={vm.characterDispatch.gadget}
        openInputModal={vm.openInputModal}
        gadgetDetail={vm.character.gadgetDetail}
        setGadgetDetail={vm.characterDispatch.gadgetDetail}
        openGadgetModal={vm.openGadgetModal}
      />
      <Attributes
        items={vm.character.attributes}
        setAttributes={vm.characterDispatch.attributes}
        openInputModal={vm.openInputModal}
        openIframeModal={vm.openIframeModal}
      />
      <Openness
        character={vm.character}
        openInputModal={vm.openInputModal}
        dispatchOpenness={vm.characterDispatch.openness}
      />
      <Equipments
        items={vm.character.equipments}
        setEquipments={vm.characterDispatch.equipments}
        openInputModal={vm.openInputModal}
      />
      <Deviation
        items={vm.character.deviations}
        setDeviations={vm.characterDispatch.deviations}
        openInputModal={vm.openInputModal}
      />
      <Garden
        cardList={cardList}
        dispatch={vm.characterDispatch}
        character={vm.character}
        openGemoryModal={vm.openGemoryModal}
        openInputModal={vm.openInputModal}
        openGemoryTypeModal={vm.openGemoryTypeModal}
        openCardModal={vm.openCardModal}
        openCardListModal={vm.openCardListModal}
        setGardenUrl={vm.setGardenUrl}
      />
      <div style={{ width: '242px', margin: '0 auto' }}>
        <CharacterCard character={vm.character} gardenUrl={vm.gardenUrl} />
      </div>
      <Cards character={vm.character} />

      <div></div>
    </SubPage>
  )
}
export default Item
