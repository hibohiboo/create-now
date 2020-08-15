// http://192.168.50.10:3000/api/v1/tyranoudon?sheet=1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58
import fetch from 'isomorphic-unfetch'
export const first = async (spreadId) => {
  const fetchUrl = 'https://sheets.googleapis.com/v4/spreadsheets'
  const key = process.env.GOOGLE_API_KEY
  // const spreadId = req.query.sheet // '1iW0dZFd1AumfqTVnR_UuPmSRJlBK5ibrgYkUC3AXO58'
  const sheet = 'characters'
  const range = 'B2:E'

  try {
    const res = await fetch(
      `${fetchUrl}/${spreadId}/values/${sheet}!${range}?key=${key}`,
    )
    const json = await res.json()
    const tags = json.values.map(toTag).join('\n')
    return `
    @call storage="common/common.ks"
    [bg storage="forest.jpg" time="100"]
    @hidemenubutton
    [position layer="message0" left=160 top=500 width=1000 height=200 page=fore visible=true]
    [position layer=message0 page=fore margint="45" marginl="50" marginr="70" marginb="60"]
    @layopt layer=message0 visible=true
${tags}
[s]
`
  } catch (e) {
    console.error(e)
    return sample
  }
}

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
