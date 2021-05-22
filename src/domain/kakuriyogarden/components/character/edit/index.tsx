import { FC } from 'react'
import Wrapper from './layout/Wrapper'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MainArea from './layout/MainArea'
import SubPage from './layout/SubPage'
import { useCharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import MagicalName from './atoms/MagicalName'
import InputModal from './molecules/InputModal'
const Edit: FC<{}> = ({ children }) => {
  const vm = useCharacterViewModel()
  return (
    <Wrapper>
      <Header>魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>
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
        </SubPage>
      </MainArea>
      <Footer>フッタ</Footer>
      <InputModal {...vm.inputModal} />
    </Wrapper>
  )
}
export default Edit
