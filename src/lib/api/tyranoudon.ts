// http://192.168.50.10:3000/api/v1/tyranoudon?sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58
import fetch from 'isomorphic-unfetch'
export const first = async (spreadId) => {
  let error_json = null
  try {
    const json = await getCharacters(spreadId)
    error_json = json
    const tags = json.values.map(toTag).join('\n')
    return `
@call storage="common/common.ks"
[bg storage="forest.jpg" time="100"]
@hidemenubutton
[position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]
[position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]
@layopt layer=message0 visible=true
[cm]
[clearfix]
[start_keyconfig]
[ptext name="chara_name_area" layer="message0" color="white" size=28 bold=true x=180 y=510]
[chara_config ptext="chara_name_area" memory="false" talk_anim="down" pos_mode="true" ]
[chara_config brightness=40 talk_focus=brightness]
${tags}
[s]
`
  } catch (e) {
    console.error(e)
    console.log('error_spread_id', spreadId)
    console.log('error_json', error_json)

    return sample
  }
}
const fetchUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
const key = process.env.GOOGLE_API_KEY
const getSheetData = async (spreadId: string, sheet: string, range: string) => {
  const res = await fetch(
    `${fetchUrl}/${spreadId}/values/${sheet}!${range}?key=${key}`,
  )
  return (await res.json()) as { values: string[][] }
}

export const getCharacters = async (spreadId) =>
  await getSheetData(spreadId, 'characters', 'B2:E')

const toTag = ([name, jname, face, url]) => {
  if (face === 'normal') {
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
[s]
`

export const getBackgrounds = async (spreadId) =>
  await getSheetData(spreadId, 'backgrounds', 'B2:E')
