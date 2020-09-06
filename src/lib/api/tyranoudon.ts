import { getSheetData } from './spreadSheet'

// http://192.168.50.10:3000/api/v1/tyranoudon?sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58

const sendLoaded = `[iscript]
window.parent.postMessage(
  {
    type: 'tyrano',
    payload: { event: 'first_scenario_loaded' }
  },
  '*',
)
[endscript]`

export const first = async (spreadId) => {
  try {
    const [
      characterJson,
      characterPartsJson,
      partsSetJson,
      scenarioJson,
    ] = await Promise.all([
      getCharacters(spreadId),
      getCharacterParts(spreadId),
      getCharacterPartsSet(spreadId),
      getScenario(spreadId),
    ])

    const characterTags = characterJson.values
      .map(toCharacterFaceTag)
      .join('\n')
    const partsTags = characterPartsJson.values
      ? characterPartsJson.values.map(toCharacterPartsTag).join('\n')
      : ''

    const setTags = partsSetJson.values
      ? partsSetJson.values.map(toCharacterPartsSetTag).join('\n')
      : ''
    const scenario = scenarioJson.values
      .map(toScenarioTag)
      .filter((s) => !!s)
      .join('\n')
    if (scenario) {
      return `
@call storage="common/common.ks"
${characterTags}
${partsTags}
${setTags}
${sendLoaded}
${scenario}
`
    }
    return firstDefaultScenario({
      characterTags,
      partsTags,
      setTags,
      sendLoaded,
    })
  } catch (e) {
    console.error(e)
    console.log('error_spread_id', spreadId)

    return sample
  }
}

const firstDefaultScenario = ({
  characterTags,
  partsTags,
  setTags,
  sendLoaded,
}: {
  characterTags: string
  partsTags: string
  setTags: string
  sendLoaded: string
}) => `
@call storage="common/common.ks"
@hidemenubutton
@bg storage="forest.jpg" time="100"
@position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true
@position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"
@layopt layer=message0 visible=true
@cm
@clearfix
@start_keyconfig
@ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510
@chara_config ptext="chara_name_area" memory="false" talk_anim="down" pos_mode="true"
@chara_config brightness=40 talk_focus=brightness
${characterTags}
${partsTags}
${setTags}
${sendLoaded}
`

export const getCharacters = async (spreadId) =>
  await getSheetData(spreadId, 'characters', 'B2:E')

const toCharacterFaceTag = ([name, jname, face, url]) => {
  if (face === 'default') {
    return `[chara_new  name="${name}" storage="${url}" jname="${jname}"]`
  }
  return `[chara_face name="${name}" face="${face}" storage="${url}"]`
}

const sample = `
@call storage="common/common.ks"
[bg storage="forest.jpg" time="100"]
@hidemenubutton
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]
@layopt layer=message0 visible=true
@call storage="common/characters.ks"
[chara_show  name="akane"]
${sendLoaded}
[s]
`

export const getBackgrounds = async (spreadId) =>
  await getSheetData(spreadId, 'backgrounds', 'B2:E')

export const getCharacterParts = async (spreadId) =>
  await getSheetData(spreadId, 'chara_parts', 'B2:G')
const toCharacterPartsTag = ([
  name,
  jname,
  partsName,
  partsId,
  zIndex,
  url,
]) => {
  if (!url) return ''
  if (partsName === 'base' && partsId.startsWith('default')) {
    const [width, height] = partsId.replace('default_', '').split('x')
    return `[chara_new name="${name}" storage="tomei.png" jname="${jname}" width=${width} height=${height}]
[chara_layer name="${name}" part="${partsName}" id="${partsId}" zindex=${zIndex} storage="${url}"]
[macro name="chara_parts_set_${name}_default"]
[chara_part_reset name="${name}"]
[endmacro]
`
  }
  return `[chara_layer name="${name}" part="${partsName}" id="${partsId}" zindex=${zIndex} storage="${url}"]`
}
export const getCharacterPartsSet = async (spreadId) =>
  await getSheetData(spreadId, 'chara_parts_set', 'A2:C')
const toCharacterPartsSetTag = ([name, setName, set]) => {
  return `@macro name="chara_parts_set_${name}_${setName}"
@chara_part_reset name="${name}"
@chara_part name="${name}" ${set}
@endmacro`
}

export const getYoutube = async (spreadId) =>
  await getSheetData(spreadId, 'youtube', 'B2:C')

export const getBgms = async (spreadId) =>
  await getSheetData(spreadId, 'bgms', 'A2:C')

export const getScenario = async (spreadId) =>
  await getSheetData(spreadId, 'scenario', 'A2:D')
const toScenarioTag = ([name, face, script, subscript]) => {
  let ret = ''
  if (name && name.trim()) ret += `#${name}`
  if (name && face && face.trim()) ret += `:${face}\n`
  else if (name) ret += '\n'
  if (script && script.trim()) ret += `${script}\n`
  if (subscript && subscript.trim()) ret += `${subscript}\n`

  return ret
}
