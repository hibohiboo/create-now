import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUdonariumMessage, changeName, changeFace } from '../actions'
import { isChatMessage } from '../ports/udon'
import type { TyranoUdon } from '../reducer'
import type { PostMessageChat } from '../ports/udon'

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
const receiveUdonMessage = (event: MessageEvent) => {
  console.log(event)
  // このメッセージの送信者は信頼している者か？
  if (event.origin !== process.env.UDONARIUM_DOMAIN) return
  const data = event.data
  if (!isChatMessage(data)) return
  console.log('received udonarium message', event.data)
  const [name, face] = data.payload.message.name.split(':')
  const text = data.payload.message.text
  const msg = createTyranoMessage(name, face || '', text)
  sendTyranoMessage(tyranoSample, msg)
  sendTyranoMessage(tyranoVchat, msg)
  sendTyranoChatMessage({ name, face, text })
  // 受け取ったメッセージのオリジンを確かめたい場合（どんな場合でもそうするべ
  // きです）、メッセージに返答するための便利なイディオムは event.source 上
  // の postMessage を呼び出し、targetOrigin に event.origin を指定すること
  // です。
  // event.source.postMessage(
  //   'hi there yourself!  the secret response ' + 'is: rheeeeet!',
  //   event.origin,
  //   [],
  // )
}

export const useViewModel = () =>
  useSelector((state: { tyranoudon: TyranoUdon }) => {
    const dispatch = useDispatch()
    const { text, name, face } = state.tyranoudon

    useEffect(() => {
      window.addEventListener('message', receiveUdonMessage, false)
      dispatch(addUdonariumMessage('sample Message:'))
    }, [])

    return {
      text,
      name,
      face,
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
      sendMessage: () => {
        if (!text) return
        sendUdonMessage(state.tyranoudon)
        const msg = createTyranoMessage(name, face, text)
        sendTyranoMessage(tyranoSample, msg)
        sendTyranoMessage(tyranoVchat, msg)
        sendTyranoChatMessage(state.tyranoudon)
        dispatch(addUdonariumMessage(''))
      },
      changeName: (name: string) => dispatch(changeName(name)),
      changeFace: (face: string) => dispatch(changeFace(face)),
      changeText: (t: string) => dispatch(addUdonariumMessage(t)),
    }
  })
const createTyranoMessage = (
  name: string,
  face: string | undefined,
  text: string,
) => {
  if (face) {
    return `[cm]
    #${name}:${face}
    ${text}`
  }
  return `[cm]
  #${name}
  ${text}`
}

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
const sendTyranoMessage = (name: string, scenario: string) => {
  const tyrano = document.getElementById(
    `iframe-tyrano-${name}`,
  ) as HTMLIFrameElement

  const message: TyranoChat = {
    type: 'chat',
    payload: { scenario },
  }
  tyrano.contentWindow.postMessage(message, process.env.TYRANO_DOMAIN)
}

const sendTyranoChatMessage = ({ name, face, text }: TyranoUdon) => {
  let message = `[chat_talk pos="left" name="${name}" text="${text}"  face="chat/akane/hirameki.png"]`
  if (name === 'やまと')
    message = `[chat_talk pos="right" name="${name}" text="${text}" face="chat/yamato/normal.png"]`
  sendTyranoMessage('chat_talk', message)
}
