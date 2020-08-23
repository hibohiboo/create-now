import { createReducer } from '@reduxjs/toolkit'
import actions from '../actions'
import * as constants from '../constants'
import type {
  TyranoMethod,
  TyranoCharacterMessageAnimation,
} from '../constants'
const { addUdonariumMessage, changeName, changeFace } = actions
export interface TyranoCharacter {
  name: string
  jname: string
  faces: string[]
}
export interface Patch {
  patch: string
  url: string
}
export interface TyranoPatchObject {
  name: string
  jname: string
  patches: Patch[]
}
export interface Chat {
  text: string
  tyranoFontColor: string
  tyranoFontSize: number
}
export interface CharacterSettings {
  name: string
  face: string
  characterPositionBottom: number
  characterMessageAnimation: TyranoCharacterMessageAnimation
}
interface BackgroundSettings {
  tyranoBackgroundMethod: TyranoMethod
  imageUrl: string
  backgrounds: TyranoPatchObject[]
  selectedBackGround?: TyranoPatchObject | null
  selectedPatch: Patch | null
}
export interface TyranoUdon {
  udonariumBackgroundImage: string
  tyranoEffectTime: number
  sceneName: string
  characters: TyranoCharacter[]
  chat: Chat
  characterSettings: CharacterSettings
  backgroundSettings: BackgroundSettings
}
const initialState = (): TyranoUdon => ({
  chat: {
    tyranoFontColor: '#ffffff',
    tyranoFontSize: 26,
    text: '',
  },
  characterSettings: {
    name: 'akane',
    face: 'normal',
    characterPositionBottom: -100,
    characterMessageAnimation: 'down',
  },
  backgroundSettings: {
    tyranoBackgroundMethod: 'fadeIn',
    imageUrl:
      'https://userdisk.webry.biglobe.ne.jp/012/472/52/N000/000/000/127764512779316326375_BG39a.jpg',
    backgrounds: [],
    selectedBackGround: null,
    selectedPatch: null,
  },
  udonariumBackgroundImage: 'forest.jpg',
  tyranoEffectTime: 500,
  sceneName: 'ミドルフェイズ / シーン2 【シーンプレイヤー：あかね】',
  characters: [
    {
      jname: 'あかね',
      name: 'akane',
      faces: ['normal', 'happy', 'doki', 'angry', 'sad'],
    },
    {
      jname: 'やまと',
      name: 'yamato',
      faces: ['normal'],
    },
  ],
})
export const init = initialState()

const reducer = createReducer(init, (builder) =>
  builder
    .addCase(addUdonariumMessage, (state, action) => {
      state.chat.text = action.payload.text
    })
    .addCase(changeName, (state, action) => {
      state.characterSettings.name = action.payload.text
      const chara = state.characters.find((c) => c.name === action.payload.text)
      if (chara) state.characterSettings.face = chara.faces[0]
    })
    .addCase(changeFace, (state, action) => {
      state.characterSettings.face = action.payload.text
    })
    .addCase(actions.changeUdonariumBackgroundImage, (state, actions) => {
      state.udonariumBackgroundImage = actions.payload.text
    })
    .addCase(actions.changeTyranoBackgroundMethod, (state, actions) => {
      if (constants.isBackgroundMethod(actions.payload.text)) {
        state.backgroundSettings.tyranoBackgroundMethod = actions.payload.text
      }
    })
    .addCase(actions.changeTyranoEffectTime, (state, actions) => {
      state.tyranoEffectTime = actions.payload.n
    })
    .addCase(actions.changeTyranoFontColor, (state, actions) => {
      state.chat.tyranoFontColor = actions.payload.text
    })
    .addCase(actions.changeTyranoFontSize, (state, actions) => {
      state.chat.tyranoFontSize = actions.payload.n
    })
    .addCase(actions.changeSceneName, (state, actions) => {
      state.sceneName = actions.payload.text
    })
    .addCase(actions.changeCharacters, (state, actions) => {
      state.characters = actions.payload.characters
    })
    .addCase(actions.changeCharacterPositionBottom, (state, actions) => {
      state.characterSettings.characterPositionBottom = actions.payload.n
    })
    .addCase(actions.changeTyranoCharaMessageAnimation, (state, actions) => {
      if (constants.isTyranoCharacterMessageAnimation(actions.payload.text))
        state.characterSettings.characterMessageAnimation = actions.payload.text
    })
    .addCase(actions.changeTyranoBackgroundImageUrl, (state, actions) => {
      state.backgroundSettings.imageUrl = actions.payload.text
    })
    .addCase(actions.changeBackgrounds, (state, actions) => {
      state.backgroundSettings.backgrounds = actions.payload.items
    })
    .addCase(actions.changeSelectedBackground, (state, actions) => {
      state.backgroundSettings.selectedBackGround = actions.payload.item
      const [patch] = actions.payload.item.patches
      if (!patch) return
      state.backgroundSettings.selectedPatch = patch
      state.backgroundSettings.imageUrl = patch.url
    })
    .addCase(actions.changeSelectedBackgroundPatch, (state, actions) => {
      state.backgroundSettings.selectedPatch = actions.payload.item
      state.backgroundSettings.imageUrl = actions.payload.item.url
    }),
)

export default reducer
