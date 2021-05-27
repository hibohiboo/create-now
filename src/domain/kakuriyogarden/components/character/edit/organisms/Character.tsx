import { FC } from 'react'
import { CharacterViewModel } from '~/domain/kakuriyogarden/store/character'
import SubPage from '../layout/SubPage'
import MagicalName from './character/MagicalName'
import Profile from './character/Profile'
import Hope from './character/Hope'
import Card from './card'

const Item: FC<{ vm: CharacterViewModel }> = ({ vm }) => {
  return (
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
      <Profile
        imageUrl={vm.character.imageUrl}
        openImageEditModal={vm.openImageEditModal}
        handleOnDrop={vm.handleOnDrop}
        openInputModal={vm.openInputModal}
        profile={vm.character.profile}
        setProfile={vm.setProfile}
      />
      <Hope
        setHopeDetail={vm.setHopeDetail}
        hopeDetail={vm.character.hopeDetail}
        openInputModal={vm.openInputModal}
      />
      <Card
        cardData={{
          type: 'マギア',
          kind: '魔法',
          name: 'アベンジャー',
          timing: 'アクション',
          count: '5',
          target: '単体',
          range: '近接状態',
          tags: ['願望'],
          effect: '',
          description: '',
          id: '',
          image: {
            url: '/images/kakuriyogarden/icons/game-icons/spark-spirit.png',
            source: 'Game-icons.net',
            sourceUrl: 'https://game-icons.net/1x1/lorc/spark-spirit.html',
          },
          maxLevel: 1,
          successRate: '-',
          level: 1,
          exp: '',
        }}
      />
    </SubPage>
  )
}
export default Item
