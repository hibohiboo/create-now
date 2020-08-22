export const bgMethods = [
  { name: 'fadeIn' },
  { name: '帯' },
  { name: 'fadeInDown' },
  { name: 'fadeInLeft' },
  { name: 'fadeInRight' },
  { name: 'fadeInUp' },
  { name: 'lightSpeedIn' },
  { name: 'rotateIn' },
  { name: 'rotateInDownLeft' },
  { name: 'rotateInDownRight' },
  { name: 'rotateInUpLeft' },
  { name: 'rotateInUpRight' },
  { name: 'zoomIn' },
  { name: 'zoomInDown' },
  { name: 'zoomInLeft' },
  { name: 'zoomInRight' },
  { name: 'zoomInUp' },
  { name: 'slideInDown' },
  { name: 'slideInLeft' },
  { name: 'slideInRight' },
  { name: 'slideInUp' },
  { name: 'bounceIn ' },
  { name: 'bounceInDown' },
  { name: 'bounceInLeft' },
  { name: 'bounceInRight' },
  { name: 'bounceInUp' },
  { name: 'rollIn' },
  { name: 'vanishIn' },
  { name: 'puffIn' },
] as const
export type TyranoMethod = typeof bgMethods[number]['name']
export const isBackgroundMethod = (m: string): m is TyranoMethod =>
  bgMethods.map((item) => item.name as string).includes(m)

export const characterMessageAnimations = [
  { name: 'down' },
  { name: 'up' },
  { name: 'none' },
] as const
export type TyranoCharacterMessageAnimation = typeof characterMessageAnimations[number]['name']
export const isTyranoCharacterMessageAnimation = (
  m: string,
): m is TyranoCharacterMessageAnimation =>
  characterMessageAnimations.map((item) => item.name as string).includes(m)
