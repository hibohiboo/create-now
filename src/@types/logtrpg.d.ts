export interface Facility {
  name: string
  type: string
  speciality: string
  level: number
  effect: string
}

export interface Camp {
  name: string
  facilities?: Facility[]
  freeWriting?: string
  playerName?: string
  uid?: string
  twitterId?: string
  createdAt?: any
  updatedAt?: any
}
