import { Dispatch, FC, useEffect, useState } from 'react'
import { Character } from '~/domain/kakuriyogarden/store/character'
import Card from '~/domain/kakuriyogarden/components/character/edit/organisms/card'

const component: FC<{
  character: Character
}> = ({ character }) => {
  const cards = character.garden
    .map((g, gi) =>
      g.cards
        .filter((c) => !!c && c.type !== '想晶')
        .map((c, ci) => ({ ...c, id: `${gi}${ci}` })),
    )
    .flat()
  return (
    <div className="flex-centering">
      {cards.map((c) => (
        <Card key={`${c.id}`} cardData={c} />
      ))}
    </div>
  )
}
export default component
