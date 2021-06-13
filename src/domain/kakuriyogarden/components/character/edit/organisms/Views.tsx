import { FC } from 'react'
import { formatMagic } from '~/domain/kakuriyogarden/classes/gemory/magic'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import CharacterCard from './images/CharacterCardImage'
import MagicCard from './images/MagicCardImage'
const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
    <SubPage id="preview">
      <CharacterCard character={vm.character} gardenUrl={vm.gardenUrl} />
      {vm.character.garden.map((g, gi) =>
        g.cards
          .filter((c) => !!c && c.type !== '想晶')
          .map((c) => formatMagic(gi + 1, c))
          .map((c, i) => <MagicCard key={i} magic={c} />),
      )}
    </SubPage>
  )
}
export default Item
