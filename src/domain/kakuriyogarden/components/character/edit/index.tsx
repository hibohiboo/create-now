import { FC } from 'react'
import Wrapper from './layout/Wrapper'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MainArea from './layout/MainArea'
import {
  CharacterViewModel,
  useCharacterViewModel,
} from '~/domain/kakuriyogarden/store/character'
import InputModal from './molecules/modal/InputModal'
import Character from './organisms/Character'
import ImageEditModal from './molecules/modal/ImageEditModal'
import NegaiModal from './organisms/modal/NegaiModal'
import GadgetModal from './organisms/modal/GadgetModal'
import IframeModal from './molecules/modal/IframeModal'
import GemoryModal from './organisms/modal/GemoryModal'
import GemoryTypeModal from './organisms/modal/GemoryTypeModal'
import CardModal from './organisms/modal/CardModal'
import CardListModal from './organisms/modal/CardListModal'
import { Magic } from '~/domain/kakuriyogarden/classes/gemory/magic'
import Views from './organisms/Views'

const Edit: FC<{ cardList: Magic[]; vm: CharacterViewModel }> = ({
  cardList,
  vm,
}) => {
  return (
    <Wrapper>
      <Header>現代異能魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>
        <Character vm={vm} cardList={cardList} />
        <div style={{ display: 'none' }}>
          <Views vm={vm} />
        </div>
      </MainArea>
      <Footer>フッタ</Footer>
      <CardListModal {...vm.cardListModal} />
      <CardModal {...vm.cardModal} />
      <GemoryModal {...vm.gemoryModal} />
      <GemoryTypeModal {...vm.gemoryTypeModal} />
      <NegaiModal {...vm.negaiModal} />
      <GadgetModal {...vm.gadgetModal} />
      <IframeModal {...vm.iframeModal} />
      <InputModal {...vm.inputModal} />
      <ImageEditModal {...vm.imageEditModal} />
    </Wrapper>
  )
}
export default Edit
