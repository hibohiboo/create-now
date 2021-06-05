export type Hope = '献身' | '利己' | '復讐'
export const getHopeImageUrl = (hope: Hope)=>{
  if(hope==='献身') return dedicationImage.url
  if(hope==='利己') return egoImage.url
  if(hope==='復讐') return avengeIamge.url
}

export const getHopeMagic = (hope: Hope)=>{
  if(hope==='献身') return dedicationMagica
  if(hope==='利己') return egoMagica
  if(hope==='復讐') return avengeMagica
}

const dedicationImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/heart-wings.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/heart-wings.html',
}
export const dedicationMagica = {
  type: '小奇跡',
  kind: '献身',
  nameKana: 'ホーリーヒール',
  name: '献身の癒し',
  timing: 'アクション',
  count: '6',
  target: '単体',
  range: '近接状態',
  tags: ['治癒', '詠唱'],
  effect:
    '想晶1つの耐久度を最大値まで回復する。それが破壊されていれば修復する。シナリオ1回。',
  gardeneffect: 'ラウンド終了時に1点回復。',
  description: '清浄な光を湛えた泉。',
  id: '',
  image: dedicationImage,
  maxLevel: 1,
  successRate: '100%',
  level: 1,
  exp: 0,
}

const egoImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/rainbow-star.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/rainbow-star.html',
}
export const egoMagica = {
  type: '小奇跡',
  kind: '利己',
  nameKana: 'シューティングスター',
  name: '利己的な流星',
  timing: 'アクション',
  count: '6',
  target: '単体',
  range: '20',
  tags: ['攻撃', '詠唱'],
  effect: '対象の想晶1つを破壊する。シナリオ1回。',
  gardeneffect: '"利己的な流星"を即唱で使用できる',
  description: '天に輝く一等星。',
  id: '',
  image: egoImage,
  maxLevel: 1,
  successRate: '100%',
  level: 1,
  exp: 0,
}
const avengeIamge = {
  url:
    '/images/kakuriyogarden/icons/game-icons/spark-spirit.png',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/lorc/spark-spirit.html',
}
export const avengeMagica = {
  type: '小奇跡',
  kind: '復讐',
  name: '復讐の炎',
  timing: 'ダメージ',
  count: '6',
  target: '単体',
  range: '近接状態',
  tags: ['攻撃', '即唱'],
  effect:
    '自身が受けたダメージと同じ値の軽減不可ダメージを対象に与える。シナリオ1回。',
  gardeneffect: '与えるダメージ+1。受けるダメージ+1。',
  description: '昏く燃え盛る炎。',
  id: '',
  image:avengeIamge,
  maxLevel: 1,
  successRate: '100%',
  level: 1,
  exp: 0,
  nameKana: 'アベンジャー',
}
