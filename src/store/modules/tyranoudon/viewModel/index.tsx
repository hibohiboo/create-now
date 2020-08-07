import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addUdonariumMessage, changeName, changeFace } from '../actions'
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
const receiveUdonMessage = (event: MessageEvent) => {
  console.log(event)
  // このメッセージの送信者は信頼している者か？
  if (event.origin !== process.env.UDONARIUM_DOMAIN) return
  console.log('received udonarium message', event.data)

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
    const tyranoSample = 'sample'
    const tyranoVchat = 'vchat'

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
        sendUdonMessage()
        sendTyranoMessage(tyranoSample, testMessage)
        sendTyranoMessage(tyranoVchat, testMessage)
        sendTyranoChatMessage()
      },
      changeName: (name: string) => dispatch(changeName(name)),
      changeFace: (face: string) => dispatch(changeFace(face)),
    }
  })
const sendUdonMessage = () => {
  const udon = document.getElementById('iframe-udonarium') as HTMLIFrameElement

  const chatMessage = {
    from: '',
    to: '',
    name: 'テスト',
    imageIdentifier: '',
    timestamp: Date.now(),
    tag: '', // GameType
    text: '送信テスト',
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
const testMessage = `
[chara_show  name="akane"]
#あかね:
こんにちはですよ。[p]
`
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

const sendTyranoChatMessage = () => {
  const message =
    '[chat_talk pos="left" name="あかね" text="なんだい？"  face="chat/akane/hirameki.png"  ]'
  sendTyranoMessage('chat_talk', message)
}
