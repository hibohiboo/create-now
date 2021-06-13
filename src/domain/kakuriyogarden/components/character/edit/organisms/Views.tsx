import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import CharacterCard from './images/CharacterCardImage'
import MagicCard from './images/MagicCardImage'
const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
    <SubPage id="preview">
      <CharacterCard character={vm.character} gardenUrl={vm.gardenUrl} />
      {vm.character.garden.map((g) =>
        g.cards
          .filter((c) => !!c && c.type !== '想晶')
          .map((c, i) => <MagicCard key={i} magic={c} />),
      )}
    </SubPage>
  )
}
export default Item
