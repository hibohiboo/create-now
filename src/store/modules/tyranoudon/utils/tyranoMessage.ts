import * as _ from 'lodash'

const escape = (str: string) => {
  return str
    .replace('[', '［')
    .replace(']', '］')
    .replace('@', '＠')
    .replace('#', '＃')
}

export const createTyranoMessage = (
  name: string,
  face: string | undefined,
  text: string,
) => {
  const fname = face ? `${escape(name)}:${escape(face)}` : escape(name)

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
  if (_.startsWith(text, '[bg3')) return true
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
