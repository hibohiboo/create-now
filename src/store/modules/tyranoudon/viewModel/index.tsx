import { useState, useEffect } from 'react'
import type { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../actions'
import { isChatMessage, isTableImageMessage } from '../ports/udon'
import { createTyranoMessage, isTagMessage } from '../utils/tyranoMessage'
import * as constants from '../constants'
import type { TyranoUdon } from '../reducer'
import type { PostMessageChat, PostMessageTableImage } from '../ports/udon'

const { addUdonariumMessage, changeName, changeFace } = actions

interface UdonariumPorts {
  chat: any
}

declare global {
  interface Window {
    // ユドナリウムとの接続口を定義
    udon: { ports: UdonariumPorts }
  }
}
const tyranoSample = 'sample'
const tyranoVchat = 'vchat'
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
const chatMessageHandler = (data: PostMessageChat, tyranoName: string) => {
  const [name, face] = data.payload.message.name.split(':')
  const text = data.payload.message.text
  console.log('tyranoName', tyranoName)
  if (tyranoName === 'chat_talk') {
    if (isTagMessage(text)) return
    sendTyranoChatTalkMessage({ name, face, text })
    return
  }
  const msg = createTyranoMessage(name, face || '', text)
  sendTyranoChatMessage(tyranoName, msg)
}
const tableImageHandler = (data: PostMessageTableImage, dispatch: Dispatch) => {
  dispatch(actions.changeUdonariumBackgroundImage(data.payload.url))
}

export const useViewModel = (ctx: { tyrano_name: string }) =>
  useSelector((state: { tyranoudon: TyranoUdon }) => {
    const dispatch = useDispatch()
    const { text, name, face } = state.tyranoudon

    useEffect(() => {
      window.addEventListener(
        'message',
        (msg) => receiveUdonMessage(msg, ctx.tyrano_name, dispatch),
        false,
      )
      // dispatch(addUdonariumMessage('sample Message:'))
    }, [])

    return {
      ...state.tyranoudon,
      tyranoSample,
      tyranoVchat,
      faceList:
        name === 'あかね'
          ? [
              { name: ' ' },
              { name: 'happy' },
              { name: 'doki' },
              { name: 'angry' },
              { name: 'sad' },
            ]
          : [{ name: ' ' }],
      methodList: constants.bgMethods,
      sendMessage: () => {
        if (!text) return
        sendUdonMessage(state.tyranoudon)
        // const msg = createTyranoMessage(name, face, text)
        // sendTyranoChatMessage(tyranoSample, msg)
        // sendTyranoChatMessage(tyranoVchat, msg)
        // sendTyranoChatTalkMessage(state.tyranoudon)
        dispatch(addUdonariumMessage(''))
      },
      sendTyranBgImageChange: () => {
        sendUdonMessage({
          ...state.tyranoudon,
          text: `[bg3 storage="${state.tyranoudon.udonariumBackgroundImage}" method="${state.tyranoudon.tyranoBackgroundMethod}"]`,
        })
      },
      changeName: (name: string) => dispatch(changeName(name)),
      changeFace: (face: string) => dispatch(changeFace(face)),
      changeText: (t: string) => dispatch(addUdonariumMessage(t)),
      changeBgMethod: (t: string) =>
        dispatch(actions.changeTyranoBackgroundMethod(t)),
    }
  })

const sendUdonMessage = ({ name, face, text }: TyranoUdon) => {
  const udon = document.getElementById('iframe-udonarium') as HTMLIFrameElement

  const chatMessage = {
    from: '',
    to: '',
    name: face.trim() === '' ? name : `${name}:${face}`,
    imageIdentifier: '',
    timestamp: Date.now(),
    tag: '', // GameType
    text: text,
  }
  const message: PostMessageChat = {
    type: 'chat',
    payload: { message: chatMessage, tab: 'MainTab' },
  }
  udon.contentWindow.postMessage(message, process.env.UDONARIUM_DOMAIN)
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

const sendTyranoChatTalkMessage = ({
  name,
  face,
  text,
}: {
  name: string
  face: string
  text: string
}) => {
  let message = `[chat_talk pos="left" name="${name}" text="${text}"  face="chat/akane/hirameki.png"]`
  if (name === 'やまと')
    message = `[chat_talk pos="right" name="${name}" text="${text}" face="chat/yamato/normal.png"]`
  sendTyranoChatMessage('chat_talk', message)
}
