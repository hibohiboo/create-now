import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import CharacterCard from './images/CharacterCardImage'
const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
    <SubPage id="preview">
      <CharacterCard gardenUrl={vm.gardenUrl} />
    </SubPage>
  )
}
export default Item
