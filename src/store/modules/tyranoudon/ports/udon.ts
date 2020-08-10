interface ChatMessageContext {
  identifier?: string
  tabIdentifier?: string
  originFrom?: string
  from?: string
  to?: string
  name?: string
  text?: string
  timestamp?: number
  tag?: string
  dicebot?: string
  imageIdentifier?: string
}
interface PostMessageData<T> {
  payload: T
  type: 'chat' | 'dice' | 'table-background'
}

export type PostMessageChat = PostMessageData<{
  message: ChatMessageContext
  tab: string
}>
export const isChatMessage = (data: any): data is PostMessageChat =>
  ['chat', 'dice'].includes(data.type)
export type PostMessageTableImage = PostMessageData<{ url: string }>
export const isTableImageMessage = (data: any): data is PostMessageTableImage =>
  ['table-background'].includes(data.type)
