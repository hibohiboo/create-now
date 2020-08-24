import { useEffect } from 'react'
import type { Dispatch } from 'redux'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../actions'
import { isChatMessage, isTableImageMessage } from '../ports/udon'
import * as tyranoMessage from '../utils/tyranoMessage'
import * as constants from '../constants'
import * as thunk from '../thunk'
import type {
  TyranoUdon,
  CharacterSettings,
  TyranoPatchObject,
  Patch,
} from '../reducer'
import type { PostMessageChat, PostMessageTableImage } from '../ports/udon'
import { init } from '../reducer'

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
    if (tyranoMessage.isTagMessage(text)) return
    sendTyranoChatTalkMessage({ name, text })
    return
  }
  const msg = tyranoMessage.createTyranoMessage(name, face || '', text)
  sendTyranoChatMessage(tyranoName, msg)
}
const tableImageHandler = (data: PostMessageTableImage, dispatch: Dispatch) => {
  dispatch(actions.changeUdonariumBackgroundImage(data.payload.url))
}
interface PageContext {
  tyrano_name: string
  tyrano_sheet: string
}
const initPage = (ctx: PageContext, dispatch) => {
  window.addEventListener(
    'message',
    (msg) => receiveUdonMessage(msg, ctx.tyrano_name, dispatch),
    false,
  )
  dispatch(thunk.fetchCharacters(ctx.tyrano_sheet))
  dispatch(thunk.fetchBackgrounds(ctx.tyrano_sheet))
}
const convertTyranoPatchObjectToSelectItem = (item: TyranoPatchObject) => ({
  value: item.name,
  label: item.jname,
})
const convertTyranoPatchToSelectItem = (item: Patch) => ({
  value: item.patch,
  label: item.patch,
})
export const useViewModel = (ctx: PageContext) =>
  useSelector((state: { tyranoudon: TyranoUdon }) => {
    const dispatch = useDispatch()
    const tuState = state.tyranoudon

    useEffect(() => {
      initPage(ctx, dispatch)
    }, [])
    const selectedCharacter = tuState.characters.find(
      (c) => c.name === tuState.characterSettings.name,
    )

    return {
      ...tuState,
      tyranoSample,
      tyranoVchat,
      faceList: selectedCharacter
        ? selectedCharacter.faces.map((name) => ({ name }))
        : [{ name: init.characterSettings.face }],
      methodList: constants.bgMethods,
      nameList: tuState.characters.map((c) => ({
        name: c.jname,
        value: c.name,
      })),
      backgroundList: tuState.backgroundSettings.backgrounds.map(
        convertTyranoPatchObjectToSelectItem,
      ),
      selectedBackground:
        (tuState.backgroundSettings.selectedBackGround &&
          convertTyranoPatchObjectToSelectItem(
            tuState.backgroundSettings.selectedBackGround,
          )) ||
        null,
      backgroundPatchesList:
        (tuState.backgroundSettings.selectedBackGround &&
          tuState.backgroundSettings.selectedBackGround.patches.map(
            convertTyranoPatchToSelectItem,
          )) ||
        [],
      selectedBackGroundPach:
        (tuState.backgroundSettings.selectedPatch &&
          convertTyranoPatchToSelectItem(
            tuState.backgroundSettings.selectedPatch,
          )) ||
        null,
      characterAnimationList: constants.characterMessageAnimations,
      rubySample: () => {
        dispatch(
          addUdonariumMessage(`${tuState.chat.text}
[ruby text="かん"]漢[ruby text="じ"]字`),
        )
      },
      sendMessage: () => {
        if (!tuState.chat.text) return
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createCharacterMessage({
            ...tuState.chat,
            ...tuState.characterSettings,
          }),
        })
        // const msg = createTyranoMessage(name, face, text)
        // sendTyranoChatMessage(tyranoSample, msg)
        // sendTyranoChatMessage(tyranoVchat, msg)
        // sendTyranoChatTalkMessage(tuState)
        dispatch(addUdonariumMessage(''))
      },
      sendTyranBgImageChange: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createBgMessage(
            tuState.udonariumBackgroundImage,
            tuState.backgroundSettings.tyranoBackgroundMethod,
            tuState.tyranoEffectTime,
          ),
        })
      },
      sendTyranoCharaShow: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createCharacterShowMessage(
            tuState.characterSettings.name,
            tuState.characterSettings.face,
            tuState.tyranoEffectTime,
            tuState.characterSettings.characterPositionBottom,
          ),
        })
      },
      sendTyranoCharaHide: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createCharacterHideMessage(
            tuState.characterSettings.name,
            tuState.tyranoEffectTime,
          ),
        })
      },
      sendTyranoCharaHideAll: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createCharacterHideAllMessage(
            tuState.tyranoEffectTime,
          ),
        })
      },
      sendZawaZawa: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createMTextZawaZawaMessage(),
        })
      },
      sendSceneName: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createMTextMessage(tuState.sceneName),
        })
      },
      sendQuake: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createQuake(tuState.tyranoEffectTime),
        })
      },
      sendQuakeHorizon: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createQuake(tuState.tyranoEffectTime, true),
        })
      },
      sendSway: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[kanim name=${tuState.characterSettings.name} keyframe=sway time=${tuState.tyranoEffectTime} count=3]
          [wa]
          [stop_kanim name=${tuState.characterSettings.name}]`,
        })
      },
      sendMyAnime: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[kanim name=${tuState.characterSettings.name} keyframe=my_anim]
          [wa]
          [stop_kanim name=${tuState.characterSettings.name}]`,
        })
      },
      sendBackgroundChange: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createBgMessage(
            tuState.backgroundSettings.imageUrl,
            tuState.backgroundSettings.tyranoBackgroundMethod,
            tuState.tyranoEffectTime,
          ),
        })
      },
      changeName: (name: string) => {
        const chara = tuState.characters.find((c) => c.name === name)
        if (chara) dispatch(changeFace(chara.faces[0]))
        const face = chara ? chara.faces[0] : init.characterSettings.face
        dispatch(changeName({ name, face }))
      },
      changeFace: (face: string) => dispatch(changeFace(face)),
      changeText: (t: string) => dispatch(addUdonariumMessage(t)),
      changeBgMethod: (t: string) =>
        dispatch(actions.changeTyranoBackgroundMethod(t)),
      changeEffectTime: (t: string) =>
        dispatch(actions.changeTyranoEffectTime(Number(t))),
      changeFontColor: (t: string) =>
        dispatch(actions.changeTyranoFontColor(t)),
      changeFontSize: (t: string) =>
        dispatch(actions.changeTyranoFontSize(Number(t))),
      changeSceneName: (t: string) => dispatch(actions.changeSceneName(t)),
      changeCharacterPositionBottom: (t: string) =>
        dispatch(actions.changeCharacterPositionBottom(Number(t))),
      changeCharacterAnimation: (t: string) =>
        dispatch(actions.changeTyranoCharaMessageAnimation(t)),
      changeBackgroundUrl: (t: string) =>
        dispatch(actions.changeTyranoBackgroundImageUrl(t)),
      changeSelectedBackground: (item) => {
        if (!item || !item.value) return
        dispatch(thunk.setBackground(item))
      },
      changeSelectedBackgroundPatch: (item) => {
        if (!item || !item.value) return
        const patch = tuState.backgroundSettings.selectedBackGround.patches.find(
          (p) => p.patch === item.value,
        )

        if (!patch) return
        dispatch(actions.changeSelectedBackgroundPatch(patch))
      },
    }
  })

const sendUdonMessage = ({
  name,
  face,
  text,
}: { text: string } & CharacterSettings) => {
  const udon = document.getElementById('iframe-udonarium') as HTMLIFrameElement
  const chatMessage = {
    from: '',
    to: '',
    name: face === init.characterSettings.face ? name : `${name}:${face}`,
    imageIdentifier: '',
    timestamp: Date.now(),
    tag: '', // GameType
    text,
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
