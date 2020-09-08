import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import * as api from '~/lib/api/tyranoudon'
import actions from '../actions'
import { init } from '../reducer'
import { partsFilePrefix } from '~/lib/tyrano/tyranoMessage'
import type {
  TyranoCharacter,
  TyranoPatchObject,
  YoutbeItem,
  UrlItem,
} from '../reducer'
import type { SelectItem } from '~/components/form/SelectableInputField'

const defaultPatch = 'default'

export const fetchCharacters = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const [json, partsJson, partsSetJson] = await Promise.all([
    api.getCharacters(spreadId),
    api.getCharacterParts(spreadId),
    api.getCharacterPartsSet(spreadId),
  ])
  console.log('fetch', json)
  const values = json.values
  const characters: TyranoCharacter[] = []
  values.forEach(([name, jname, face]) => {
    if (face === defaultPatch) {
      characters.push({ name, jname, faces: [init.characterSettings.face] })
      return
    }
    const chara = characters.find((c) => c.name === name)
    if (!chara) return
    chara.faces.push(face)
  })

  const parts: TyranoCharacter[] = partsJson.values
    ? _.uniqBy(
        partsJson.values.map(([name, jname]) => ({
          name,
          jname,
        })),
        (i) => i.name,
      ).map(({ name, jname }) => ({
        name,
        jname,
        faces: [
          `${partsFilePrefix}_${init.characterSettings.face}`,
          ...partsSetJson.values
            .filter(([n]) => n === name)
            .map(([, setName]) => `${partsFilePrefix}_${setName}`),
        ],
      }))
    : []
  const results = characters.concat(parts)
  dispatch(actions.changeCharacters(results))
}
export const fetchBackgrounds = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const json = await api.getBackgrounds(spreadId)
  const values = json.values
  const items: TyranoPatchObject[] = []
  values.forEach(([name, jname, patch, url]) => {
    const item = items.find((c) => c.name === name)
    const patchObj = { patch, url }
    if (patch === defaultPatch) {
      items.push({ name, jname, patches: [patchObj] })
      return
    }
    if (!item) return
    item.patches.push(patchObj)
  })

  dispatch(actions.changeBackgrounds(items))
}
// ViewModelでやっちゃってもよかったかも。。
export const setBackground = (item: SelectItem): AppThunk => async (
  dispatch,
  getState,
) => {
  const bg = getState().tyranoudon.backgroundSettings.backgrounds.find(
    (i) => i.name === item.value,
  )
  if (!bg) return
  dispatch(actions.changeSelectedBackground(bg))
  // const [patch] = bg.patches
  // if (patch) dispatch(actions.changeSelectedBackgroundPatch(patch))
}
export const fetchYoutube = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const json = await api.getYoutube(spreadId)
  const values = json.values
  const items: YoutbeItem[] = values.map(([name, id]) => ({ name, id }))

  dispatch(actions.changeYoutubeItems(items))
}
export const fetchBgms = (spreadId: string): AppThunk => async (dispatch) => {
  const json = await api.getBgms(spreadId)
  const values = json.values
  const items: UrlItem[] = values.map(([name, url]) => ({ name, url }))

  dispatch(actions.changeBgmItems(items))
}
export const fetchVideos = (spreadId: string): AppThunk => async (dispatch) => {
  const json = await api.getVideos(spreadId)
  const values = json.values
  const items: UrlItem[] = values.map(([name, url]) => ({ name, url }))

  dispatch(actions.changeLayerMovieItems(items))
}
export const fetchSoundEffects = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const json = await api.getSoundEffects(spreadId)
  const values = json.values
  const items: UrlItem[] = values.map(([name, url]) => ({ name, url }))

  dispatch(actions.changeSoundEffectItems(items))
}
