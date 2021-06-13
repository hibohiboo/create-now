import { FC } from 'react'
import { formatMagic } from '~/domain/kakuriyogarden/classes/gemory/magic'
import { getHopeMagic } from '~/domain/kakuriyogarden/classes/hope'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import CharacterCard from './images/CharacterCardImage'
import MagicCard from './images/MagicCardImage'
const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  // konvaを使う(CharacterCardなどで使用＾)と Warning: useLayoutEffect が出るが一旦無視
  return (
    <SubPage id="preview">
      <CharacterCard character={vm.character} gardenUrl={vm.gardenUrl} />
      <MagicCard magic={getHopeMagic(vm.character.hope)} id={'card-hope'} />
      {vm.character.garden.map((g, gi) =>
        g.cards
          .filter((c) => !!c && c.type !== '想晶')
          .map((c) => formatMagic(gi + 1, c))
          .map((c, i) => (
            <MagicCard key={i} magic={c} id={`card-${gi}_${i}`} />
          )),
      )}
    </SubPage>
  )
}
export default Item
