export type Hope = '武器' | '仮面' | '鎖' | '生物' | '自然' | '歯車'
export const getGadgetImageUrl = (hope: Hope)=>{
  if(hope==='武器') return weaponImage.url
}
const weaponImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/saber-and-pistol.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/saber-and-pistol.html',
}
