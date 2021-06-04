import { FC } from 'react'
import Wrapper from './layout/Wrapper'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MainArea from './layout/MainArea'
import { useCharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import InputModal from './molecules/modal/InputModal'
import Character from './organisms/Character'
import ImageEditModal from './molecules/modal/ImageEditModal'
import NegaiModal from './organisms/modal/NegaiModal'
import GadgetModal from './organisms/modal/GadgetModal'
import IframeModal from './molecules/modal/IframeModal'
import GemoryModal from './organisms/modal/GemoryModal'
import GemoryTypeModal from './organisms/modal/GemoryTypeModal'

const Edit: FC<{}> = ({ children }) => {
  const vm = useCharacterViewModel()
  return (
    <Wrapper>
      <Header>現代異能魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>
        <Character vm={vm} />
      </MainArea>
      <Footer>フッタ</Footer>
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
