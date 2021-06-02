export type Gadget = '武器' | '仮面' | '鎖' | '生物' | '自然' | '歯車'
export const getGadgetImageUrl = (g: Gadget)=>{
  if(g==='武器') return weaponImage.url
  if(g==='仮面') return maskImage.url
  if(g==='歯車') return gearImage.url
  if(g==='生物') return animalImage.url
  if(g==='自然') return natureImage.url
  if(g==='鎖') return chainImage.url
  return weaponImage.url
}
const weaponImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/saber-and-pistol.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/saber-and-pistol.html',
}

const maskImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/double-face-mask.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/double-face-mask.html',
}
const chainImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/crossed-chains.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/crossed-chains.html',
}

const animalImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/wolf-head.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/wolf-head.html',
}

const natureImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/new-shoot.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/new-shoot.html',
}


const gearImage = {
  url:
    '/images/kakuriyogarden/icons/game-icons/clockwork.svg',
  source: 'Game-icons.net',
  sourceUrl:
    'https://game-icons.net/1x1/delapouite/clockwork.html',
}
