import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import type { TyranoUdon } from '../reducer'
import { addUdonariumMessage } from '../actions'

interface UdonariumPorts {
  chat: any
}

// ユドナリウムとの接続口を定義
declare global {
  interface Window {
    udon: { ports: UdonariumPorts }
  }
}
const receiveMessage = (event: MessageEvent) => {
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
    const { text } = state.tyranoudon

    useEffect(() => {
      window.addEventListener('message', receiveMessage, false)

      dispatch(addUdonariumMessage('sample Message:'))
    }, [])

    return {
      text,
      sendMessage: () => {
        const udon = document.getElementById(
          'iframe-udonarium',
        ) as HTMLIFrameElement
        console.log('iframe ユドナリウム', udon.contentWindow)
        const chatMessage = {
          from: '',
          to: '',
          name: 'テスト',
          imageIdentifier: '',
          timestamp: Date.now(),
          tag: '', // GameType
          text: '送信テスト',
        }
        udon.contentWindow.postMessage(
          {
            event: 'sendMessage',
            message: chatMessage,
            tab: 'MainTab',
          },
          process.env.UDONARIUM_DOMAIN,
        )
      },
    }
  })
