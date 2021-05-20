import { FC } from 'react'
import Wrapper from './layout/Wrapper'
import Header from './layout/Header'
import Footer from './layout/Footer'
import MainArea from './layout/MainArea'

const Edit: FC<{}> = ({ children }) => {
  return (
    <Wrapper>
      <Header>魔法少女心象風景バトルTRPG『カクリヨガーデン』</Header>
      <MainArea>{children}魔法少女</MainArea>
      <Footer>フッタ</Footer>
    </Wrapper>
  )
}
export default Edit
