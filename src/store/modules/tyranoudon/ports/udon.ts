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
  type: 'chat' | 'dice'
}

export type PostMessageChat = PostMessageData<{
  message: ChatMessageContext
  tab: string
}>
const isChatMessage = (data: any): data is PostMessageChat =>
  ['chat', 'dice'].includes(data.type)
