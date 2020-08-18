import { AppThunk } from '~/store/rootState'
import { getCharacters } from '~/lib/api/tyranoudon'
import actions from '../actions'
import type { TyranoCharacter } from '../reducer'

export const fetchCharacters = (spreadId: string): AppThunk => async (
  dispatch,
) => {
  const json = await getCharacters(spreadId)
  console.log('fetch', json)
  const values = json.values
  const characters: TyranoCharacter[] = []
  values.forEach(([name, jname, face]) => {
    if (face === 'normal') {
      characters.push({ name, jname, faces: [' '] })
      return
    }
    const chara = characters.find((c) => c.name === name)
    if (!chara) return
    chara.faces.push(face)
  })
  console.log('characters', characters)
  dispatch(actions.changeCharacters(characters))
}
