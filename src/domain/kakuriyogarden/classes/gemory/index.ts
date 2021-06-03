import { Magic } from "./magic";

export interface Gemory{
  description: string
  strength: number
  type: GemoryType
  cards: Magic[],
}
export type GemoryType = '死' |'病' |'恐怖' |'戦い' |'日常' |'愛'
