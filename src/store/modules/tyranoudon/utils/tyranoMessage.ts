import * as _ from 'lodash'

const escape = (str: string) => {
  return str
    .replace('[', '［')
    .replace(']', '］')
    .replace('@', '＠')
    .replace('#', '＃')
}
const hasFace = (face) => face && face.trim() !== ''
export const createTyranoMessage = (
  name: string,
  face: string | undefined,
  text: string,
) => {
  const fname = hasFace(face) ? `${escape(name)}:${escape(face)}` : escape(name)

  if (name.includes('BCDice')) {
    return createBcdiceMessage(name, face, text)
  } else if (isTagMessage(text)) {
    return text
  }

  return `[cm]
#${fname}
${escape(text)}
`
}

export const isTagMessage = (text: string) => {
  if (!_.startsWith(text, '[')) return false
  if (_.startsWith(text, '[bg3 ')) return true
  if (_.startsWith(text, '[chara_show ')) return true
  return false
}

const createBcdiceMessage = (
  name: string,
  face: string | undefined,
  text: string,
) => {
  const bcname = name.replace('<BCDice：', '').replace('>', '')
  // ;`(2D6) → 6[2,4] → 6`
  const regex = /\(([0-9]+)[D|d]([0-9]+)\)/
  const [m, diceNum, diceFace] = text.match(regex) // 一致, ダイスの個数, n面体
  const dice = _.fill(Array(Number(diceNum)), Number(diceFace)).join(',')
  if (diceNum === '1') {
    const r = text.replace(`DiceBot : (1D${diceFace}) → `, '')
    return `[cm]
#${bcname}
[dice array_dice="${dice}" array_result="${r}" result_str="${text}" chara_name="${bcname}"]
`
  }
  const resultRegex = /\[([0-9,]+)\]/
  const [m2, result] = text.match(resultRegex)

  const fbcname = face ? `${escape(bcname)}:${escape(face)}` : escape(bcname)
  // #${fbcname} を入れると、nextOrderがバグる
  return `
#${fbcname}
[dice array_dice="${dice}" array_result="${result}" result_str="${text}" chara_name="${bcname}"]
`
}

export const createBgMessage = (img: string, method: string, time: number) =>
  `[bg3 storage="${img}" method="${method}" time="${time}"]`

export const createCharacterShowMessage = (
  name: string,
  face: string | undefined,
  time: number,
) =>
  hasFace(face)
    ? `[chara_show name="${escape(name)}" face="${escape(
        face,
      )}" time="${time}"]`
    : `[chara_show name="${escape(name)}" time="${time}"]`
