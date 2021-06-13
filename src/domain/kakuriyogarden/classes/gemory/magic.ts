
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
    '移動:[配置階層]',
  gardeneffect: 'アクションで撤退できる',
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
export const labelData = {
  timing: 'タイミング',
  count: 'カウント',
  range: '射程',
  target: '対象',
  maxLevel: '最大Lv',
  level: 'Lv',
  exp: 'コスト',
  successRate: '成功率',
}


export const quickShootMagic: Magic = {
  type: '魔法',
  kind: '一般',
  nameKana: '',
  name: 'クイックシュート',
  timing: 'アクション',
  count: '2',
  target: '単体',
  range: '2',
  tags: ['攻撃', '詠唱','一節'],
  effect:
    'ダメージ:1',
  gardeneffect: '射程+1',
  description: '細い光',
  successRate: '50%',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/striking-splinter.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/lorc/striking-splinter.html',
  },
  maxLevel: 1,

  level: 1,
  exp: 15,
}
export const shootMagic: Magic = {
  type: '魔法',
  kind: '一般',
  nameKana: '',
  name: 'シュート',
  timing: 'アクション',
  count: '4',
  target: '単体',
  range: '4',
  tags: ['攻撃', '詠唱'],
  effect:
    'ダメージ:[配置階層]',
  gardeneffect: '射程+1',
  description: '強い光',
  successRate: '70%',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/supersonic-arrow.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/lorc/supersonic-arrow.html',
  },
  maxLevel: 1,

  level: 1,
  exp: 15,
}
export const fireballMagic: Magic = {
  type: '魔法',
  kind: '死',
  nameKana: 'ファイアボール',
  name: '爆裂火球',
  timing: 'アクション',
  count: '6',
  target: '横3マス',
  range: '5',
  tags: ['攻撃', '詠唱','火'],
  effect:
    'ダメージ:5',
  gardeneffect: 'カウント-1(最低1)',
  description: '燃え盛る火炎',
  successRate: '60%',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/haunting.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/lorc/haunting.html',
  },
  maxLevel: 1,

  level: 1,
  exp: 15,
}
export const wallMagic: Magic = {
  type: '魔法',
  kind: '一般',
  nameKana: 'ウォール',
  name: '防壁',
  timing: '常駐',
  count: '0',
  target: '全体',
  range: '庭園',
  tags: [],
  effect:
    `この魔法の配置階層より深い階層と、浅い階層（配置階層を含む）では互いに射程が届かないものとする。
配置階層より深い階層へは庭園主しか入ることはできない。`,
  gardeneffect: 'ダメージ軽減:1',
  description: '心理防壁。何物モ立チ入ルベカラズ',
  successRate: '-',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/brick-wall.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/delapouite/brick-wall.html',
  },
  maxLevel: 1,

  level: 1,
  exp: 15,
}

export const gemory: Magic = {
  type: '想晶',
  kind: '想晶',
  nameKana: 'ココロガラス',
  name: '想晶',
  timing: '-',
  count: '0',
  target: '-',
  range: '-',
  tags: [],
  effect:
    ``,
  gardeneffect: `攻撃対象に配置階層の想晶を選ぶことができる`,
  description: '記憶の結晶。想いの欠片。',
  successRate: '-',
  id: '',
  image: {
    url:
      '/images/kakuriyogarden/icons/game-icons/crystal-growth.svg',
    source: 'Game-icons.net',
    sourceUrl:
      'https://game-icons.net/1x1/lorc/crystal-growth.html',
  },
  maxLevel: 1,

  level: 1,
  exp: 0,
}

export const formatMagic = (layer:number, magic: Magic)=>({...magic, effect:magic.effect.replace(/\[配置階層\]/g, `${layer}`)})
