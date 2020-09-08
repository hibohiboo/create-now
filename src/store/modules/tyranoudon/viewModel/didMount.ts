import type { Dispatch } from 'redux'
import { isChatMessage, isTableImageMessage } from '../ports/udon'
import * as thunk from '../thunk'
import actions from '../actions'
import type { PostMessageTableImage } from '../ports/udon'
import type { PostMessageChat } from '../ports/udon'
import * as tyranoMessage from '~/lib/tyrano/tyranoMessage'

export interface PageContext {
  tyrano_name: string
  tyrano_sheet: string
}
export const initPage = (ctx: PageContext, dispatch) => {
  window.addEventListener(
    'message',
    (msg) => {
      if (msg.data.type === 'tyrano') {
        dispatch(actions.changeTyranoStatus(true))
        return
      }
      receiveUdonMessage(msg, ctx.tyrano_name, dispatch)
    },
    false,
  )

  dispatch(thunk.fetchCharacters(ctx.tyrano_sheet))
  dispatch(thunk.fetchBackgrounds(ctx.tyrano_sheet))
  dispatch(thunk.fetchYoutube(ctx.tyrano_sheet))
  dispatch(thunk.fetchBgms(ctx.tyrano_sheet))
  dispatch(thunk.fetchVideos(ctx.tyrano_sheet))
  dispatch(thunk.fetchSoundEffects(ctx.tyrano_sheet))
}

const receiveUdonMessage = (
  event: MessageEvent,
  tyranoName: string,
  dispatch: Dispatch,
) => {
  console.log(event)
  // このメッセージの送信者は信頼している者か？
  if (event.origin !== process.env.UDONARIUM_DOMAIN) return
  const data = event.data
  console.log('received udonarium message', event.data)
  if (isChatMessage(data)) {
    chatMessageHandler(data, tyranoName)
    return
  }
  if (isTableImageMessage(data)) {
    tableImageHandler(data, dispatch)
    return
  }

  // 受け取ったメッセージのオリジンを確かめたい場合（どんな場合でもそうするべきです）
  // 、メッセージに返答するための便利なイディオムは event.source 上の postMessage を呼び出し、targetOrigin に event.origin を指定することです。
  // event.source.postMessage('hi!  the secret response ' + 'is: rheeeeet!',event.origin, [],)
}
const tableImageHandler = (data: PostMessageTableImage, dispatch: Dispatch) => {
  dispatch(actions.changeUdonariumBackgroundImage(data.payload.url))
}

const chatMessageHandler = (data: PostMessageChat, tyranoName: string) => {
  const [name, face] = data.payload.message.name.split(':')
  const text = data.payload.message.text
  console.log('tyranoName', tyranoName)
  if (tyranoName === 'chat_talk') {
    if (tyranoMessage.isTagMessage(text)) return
    sendTyranoChatTalkMessage({ name, text })
    return
  }
  const msg = tyranoMessage.createTyranoMessage(name, face || '', text)
  sendTyranoChatMessage(tyranoName, msg)
}
const sendTyranoChatTalkMessage = ({
  name,
  text,
}: {
  text: string
  name: string
}) => {
  let message = `[chat_talk pos="left" name="${name}" text="${text}"  face="chat/akane/hirameki.png"]`
  if (name === 'やまと')
    message = `[chat_talk pos="right" name="${name}" text="${text}" face="chat/yamato/normal.png"]`
  sendTyranoChatMessage('chat_talk', message)
}
const sendTyranoMessage = (
  name: string,
  message: { type: string; payload: any },
) => {
  const tyrano = document.getElementById(
    `iframe-tyrano-${name}`,
  ) as HTMLIFrameElement
  console.log(name, tyrano)
  tyrano.contentWindow.postMessage(message, process.env.TYRANO_DOMAIN)
}
interface TyranoChat {
  type: 'chat'
  payload: { scenario: string }
}
// const testMessage = `
// [chara_show  name="akane"]
// #あかね:
// こんにちはですよ。[p]
// `
const sendTyranoChatMessage = (name: string, scenario: string) => {
  const message: TyranoChat = {
    type: 'chat',
    payload: { scenario },
  }
  sendTyranoMessage(name, message)
}
