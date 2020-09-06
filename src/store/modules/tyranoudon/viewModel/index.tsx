import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import actions from '../actions'
import * as thunk from '../thunk'
import * as tyranoMessage from '../utils/tyranoMessage'
import * as constants from '../constants'
import { initPage } from './didMount'
import type {
  TyranoUdon,
  CharacterSettings,
  TyranoPatchObject,
  Patch,
} from '../reducer'
import { init } from '../reducer'
import type { PostMessageChat } from '../ports/udon'
import type { PageContext } from './didMount'

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

const convertTyranoPatchObjectToSelectItem = (item: TyranoPatchObject) => ({
  value: item.name,
  label: item.jname,
})
const convertTyranoPatchToSelectItem = (item: Patch) => ({
  value: item.patch,
  label: item.patch,
})
const tyranoSample = 'sample'
const tyranoVchat = 'vchat'

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
      sendSwayInfinite: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[kanim name=${tuState.characterSettings.name} keyframe=sway time=${tuState.tyranoEffectTime} count=infinite]`,
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
      sendBlur: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[filter layer=base blur=10]`,
        })
      },
      sendSepia: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[filter layer=base sepia=50]`,
        })
      },
      sendBrightness: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[filter layer=base brightness=40]`,
        })
      },
      sendFreeFilter: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[free_filter layer=base]`,
        })
      },
      sendYoutube: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createYoutube(tuState.youtubeSettings.id),
        })
      },
      sendStopYoutube: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: `[cm ]`,
        })
      },
      sendPlayBGM: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createPlayBGM(tuState.bgmSettings.bgmUrl),
        })
      },
      sendFadeInBGM: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createFadeinBGM(tuState.bgmSettings.bgmUrl),
        })
      },
      sendStopBGM: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createStopBGM(),
        })
      },
      sendFadeOutBGM: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createFadeoutBGM(),
        })
      },
      sendLayerModeMovie: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createLayerModeMovie(tuState.layerMovie),
        })
      },
      sendFreeLayerModeMovie: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createFreeLayerModeMovie(),
        })
      },
      sendPlaySE: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createPlaySE(tuState.soundEffect.url),
        })
      },
      sendStopSE: () => {
        sendUdonMessage({
          ...tuState.characterSettings,
          text: tyranoMessage.createStopSE(),
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
      changeYoutubeItem: (item) => {
        dispatch(actions.changeYoutubeID(item.id))
      },
      changeYoutubeId: (id: string) => {
        dispatch(actions.changeYoutubeID(id))
      },
      changeBgmItem: (item) => {
        dispatch(actions.changeBgmUrl(item.url))
      },
      changeLayerMovieItem: (item) => {
        dispatch(actions.changeLayerMovieUrl(item.url))
      },
      changeSoundEffectItem: (item) => {
        dispatch(actions.changeSoundEffectUrl(item.url))
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

export type TyranoUdonViewModel = ReturnType<typeof useViewModel>
