import { FC } from 'react'
import Wrapper from './layout/Wrapper'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MainArea from './layout/MainArea'
import SubPage from './layout/SubPage'
import { useCharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import MagicalName from './atoms/MagicalName'

const Edit: FC<{}> = ({ children }) => {
  const vm = useCharacterViewModel()
  return (
    <Wrapper>
      <Header>魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>
        <SubPage id="cloth">
          <MagicalName
            symbolName={vm.symbolName}
            magicalName={vm.magicalName}
          />
        </SubPage>
      </MainArea>
      <Footer>フッタ</Footer>
    </Wrapper>
  )
}
export default Edit
