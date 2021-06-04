
export type Magic =  {
  type: string
  kind: string
  name: string
  nameKana: string
  timing: string
  count: string
  target: string
  range: string
  tags: string[]
  effect: string
  gardeneffect: string
  description: string
  successRate: string
  id: string
  image: {
    url:string,
    source: string,
    sourceUrl:string,
  }
  maxLevel: null | number
  level: null | number
  exp: number
}
export const moveMagic: Magic = {
  type: '魔法',
  kind: '一般',
  nameKana: 'ムーブ',
  name: '移動',
  timing: 'アクション',
  count: '4',
  target: '自身',
  range: '自身',
  tags: ['移動', '即唱'],
  effect:
    '[この魔法が配置されている階層]マスまで移動できる。',
  gardeneffect: 'アクションで撤退できる。',
  description: '細道。',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/footprint.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/lorc/footprint.html',
  },
  maxLevel: 1,
  successRate: '100%',
  level: 1,
  exp: 15,
}
