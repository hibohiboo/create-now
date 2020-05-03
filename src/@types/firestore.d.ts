export interface FireStoreAPIResponse {
  name: string
  fields: any
  createdTime: Date
  updateTime: Date
}
export type AtLeast<N extends number, T> = AtLeastRec<N, T, T[], []>

type AtLeastRec<Num, Elm, T extends unknown[], C extends unknown[]> = {
  0: T
  1: AtLeastRec<Num, Elm, Append<Elm, T>, Append<unknown, C>>
}[C extends { length: Num } ? 0 : 1]
