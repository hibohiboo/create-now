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

const Edit: FC<{}> = ({ children }) => {
  const vm = useCharacterViewModel()
  return (
    <Wrapper>
      <Header>現代異能魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>
        <Character vm={vm} />
      </MainArea>
      <Footer>フッタ</Footer>
      <InputModal {...vm.inputModal} />
      <ImageEditModal {...vm.imageEditModal} />
      <NegaiModal show={true} closeHandler={() => {}} />
    </Wrapper>
  )
}
export default Edit
