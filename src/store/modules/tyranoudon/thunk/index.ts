import * as _ from 'lodash'
import { AppThunk } from '~/store/rootState'
import * as api from '~/lib/api/tyranoudon'
import actions from '../actions'
import type { TyranoCharacter, TyranoPatchObject } from '../reducer'
import type { SelectItem } from '~/components/form/SelectableInputField'
const defaultPatch = 'normal'
export const fetchCharacters = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const json = await api.getCharacters(spreadId)
  console.log('fetch', json)
  const values = json.values
  const characters: TyranoCharacter[] = []
  values.forEach(([name, jname, face]) => {
    if (face === defaultPatch) {
      characters.push({ name, jname, faces: ['normal'] })
      return
    }
    const chara = characters.find((c) => c.name === name)
    if (!chara) return
    chara.faces.push(face)
  })
  const partsJson = await api.getCharacterParts(spreadId)
  const partsSetJson = await api.getCharacterPartsSet(spreadId)
  const parts: TyranoCharacter[] = _.uniqBy(
    partsJson.values.map(([name, jname]) => ({
      name,
      jname,
    })),
    (i) => i.name,
  ).map(({ name, jname }) => ({
    name,
    jname,
    faces: [
      'set_normal',
      ...partsSetJson.values
        .filter(([n]) => n === name)
        .map(([, setName]) => `set_${setName}`),
    ],
  }))

  dispatch(actions.changeCharacters(_.union(characters, parts)))
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
