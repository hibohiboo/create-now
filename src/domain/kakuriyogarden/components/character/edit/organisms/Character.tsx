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

const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
    <SubPage id="cloth">
      <MagicalName
        symbolName={vm.character.symbolName}
        magicalName={vm.character.magicalName}
        symbolNameKana={vm.character.symbolNameKana}
        setSymbolName={vm.characterDispatch.symbolName}
        setSymbolNameKana={vm.characterDispatch.symbolNameKana}
        setMagicalName={vm.characterDispatch.magicalName}
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
      <Openness />
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
        hope={vm.character.hope}
        gardenItems={vm.character.garden}
        openGemoryModal={vm.openGemoryModal}
      />
    </SubPage>
  )
}
export default Item
