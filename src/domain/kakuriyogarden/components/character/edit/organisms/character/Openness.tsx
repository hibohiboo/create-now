import { FC } from 'react'
import { getGadgetImageUrl } from '~/domain/kakuriyogarden/classes/gadget'
import { OpenInputModal } from '~/domain/kakuriyogarden/store/character/modal'
import { Character } from '~/domain/kakuriyogarden/store/character'
const component: FC<{
  character: Character
  openInputModal: OpenInputModal
  dispatchOpenness: any
}> = ({ character, openInputModal, dispatchOpenness }) => {
  const gardenCost = character.garden.length * 30
  const cardExps = character.garden
    .map((g) => g.cards.map((c) => (c ? Number(c.exp) : 0)))
    .flat()
  // 1階層はコスト不要なので、その分を引く
  const cardCost = (cardExps.length - character.garden.length) * 10
  const skillCost = cardExps.reduce((acc, cur) => acc + cur, 0)
  const deviationCost = character.deviations.length
  const result = gardenCost + cardCost + skillCost
  return (
    <div className="kg-section">
      <div className="kg-section-title">
        <span style={{ paddingLeft: '10px' }}>解放度</span>
        <div className="flex-centering">
          <img src="/images/kakuriyogarden/icons/game-icons/breaking-chain.svg" />
        </div>
      </div>
      <div>
        <div className="kg-section-title">上限</div>
        <div style={{ fontSize: '2rem' }}>
          <span
            className="kg-editable"
            onClick={() =>
              openInputModal(
                '解放度上限',
                String(character.openness),
                dispatchOpenness,
                'number',
              )
            }
          >
            {character.openness}
          </span>
          <span style={{ fontSize: '1rem' }}>+ {deviationCost}</span>
        </div>
      </div>
      <div>
        <div className="kg-section-title flex-centering">コスト</div>
        <div
          style={{
            fontSize: '1.8rem',
            paddingLeft: '20px',
            paddingTop: '5px',
          }}
        >
          {result} /
          <span style={{ fontSize: '1.2rem' }}>
            {Number(character.openness) - -deviationCost}
          </span>
        </div>
      </div>
    </div>
  )
}
export default component
