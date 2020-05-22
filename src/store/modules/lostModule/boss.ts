import type { Ability } from './character'
export interface Boss {
  name: string
  level: number
  specialties: string[]
  abilities: Ability[]
  gaps: ('A' | 'B' | 'C' | 'D' | 'E')[]
  statusAilments: string[]
  stamina: number
  willPower: number
  damagedSpecialties: string[]
  freeWriting?: string
  summary?: string
  isPublish?: boolean
  creatorName?: string
  uid?: string
  imageUrl?: string
  id?: string
  createdAt?: any
  updatedAt?: any
}

export const initBoss: Boss = {
  name: '',
  level: 3,
  specialties: [],
  abilities: [],
  gaps: [],
  statusAilments: [],
  stamina: 10,
  willPower: 10,
  damagedSpecialties: [],
  summary: '',
  freeWriting: '',
  creatorName: '',
  createdAt: '',
  updatedAt: '',
  uid: '',
  isPublish: false,
}
