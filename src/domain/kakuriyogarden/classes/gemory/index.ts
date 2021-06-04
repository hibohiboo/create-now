import { Magic } from "./magic";

export interface Gemory{
  strength: number
  type: GemoryType
  description: string // 風景
  episode: string // エピソード
  cards: Magic[],
}
export type GemoryType = '死' |'病' |'恐怖' |'戦い' |'日常' |'愛'

export const getGemoryImage = (g: GemoryType)=>{
  if(g==='恐怖') return fearImage.url
  if(g==='愛') return loveImage.url
  if(g==='戦い') return battleImage.url
  if(g==='日常') return everudayImage.url
  if(g==='死')return deathImage.url
  if(g==='病') return patientImage.url
  return ''
}
const deathImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/haunting.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/haunting.html',
}
const patientImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/pill-drop.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/pill-drop.html',
}
const fearImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/swallow.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/swallow.html',
}
const battleImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/battle-gear.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/battle-gear.html',
}
const everudayImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/park-bench.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/park-bench.html',
}
const loveImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/lovers.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/lovers.html',
}
