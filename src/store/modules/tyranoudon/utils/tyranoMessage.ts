import * as _ from 'lodash'

const escape = (str: string) => {
  return (
    str
      .replace('[', '［')
      // .replace(']', '］')
      .replace('@', '＠')
      .replace('#', '＃')
      .replace('［font', '[font')
      .replace('［resetfont', '[resetfont')
      .replace('［ruby', '[ruby')
  )
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
  if (_.startsWith(text, '[chara_hide ')) return true
  if (_.startsWith(text, '[chara_hide_all ')) return true
  // if (_.startsWith(text, '[layopt ')) return true
  // if (_.startsWith(text, '[image ')) return true
  // if (_.startsWith(text, '[kanim ')) return true
  // if (_.startsWith(text, '[wa ')) return true
  if (_.startsWith(text, '[keyframe ')) return true
  // if (_.startsWith(text, '[frame ')) return true
  // if (_.startsWith(text, '[endkeyframe ')) return true
  // if (_.startsWith(text, '[freeimage ')) return true
  if (_.startsWith(text, '[mtext ')) return true
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

export const createBgMessage = (img: string, method: string, time: number) => {
  if (method === '帯') {
    return `[chara_hide_all time="0"]
[keyframe name="slideInA"]
  [frame p="  0%" rotate="-40deg" x="-800"]
  [frame p=" 25%" rotate="-40deg" x="0"]
  [frame p="100%" rotate="-40deg" x="0"]
[endkeyframe]
[keyframe name="slideInB"]
  [frame p="  0%" rotate="-80deg" x="800"]
  [frame p=" 15%" rotate="-80deg" x="800"]
  [frame p=" 50%" rotate="-80deg" x="0"]
  [frame p="100%" rotate="-80deg" x="0"]
[endkeyframe]
[keyframe name="slideInC"]
  [frame p="  0%" rotate="-35deg" x="-2000"]
  [frame p=" 35%" rotate="-35deg" x="-2000"]
  [frame p=" 75%" rotate="-35deg" x="0"]
  [frame p="100%" rotate="-35deg" x="0"]
[endkeyframe]
[keyframe name="slideInD"]
  [frame p="  0%" rotate="-80deg" x="2000"]
  [frame p=" 50%" rotate="-80deg" x="2000"]
  [frame p="100%" rotate="-80deg" x="0"]
[endkeyframe]
[keyframe name="slideOutA"]
  [frame p="  0%" rotate="-40deg" x="0"]
  [frame p=" 50%" rotate="-40deg" x="0"]
  [frame p="100%" rotate="-40deg" x="800"]
[endkeyframe]
[keyframe name="slideOutB"]
  [frame p="  0%" rotate="-80deg" x="0"]
  [frame p=" 35%" rotate="-80deg" x="0"]
  [frame p=" 75%" rotate="-80deg" x="-1200"]
  [frame p="100%" rotate="-80deg" x="-1200"]
[endkeyframe]
[keyframe name="slideOutC"]
  [frame p="  0%" rotate="-35deg" x="0"]
  [frame p=" 15%" rotate="-35deg" x="0"]
  [frame p=" 50%" rotate="-35deg" x="2000"]
  [frame p="100%" rotate="-35deg" x="2000"]
[endkeyframe]
[keyframe name="slideOutD"]
  [frame p="  0%" rotate="-80deg" x="0"]
  [frame p=" 25%" rotate="-80deg" x="-2000"]
  [frame p="100%" rotate="-80deg" x="-2000"]
[endkeyframe]

[layopt layer="message0" visible="false"]
[layopt layer="fix"      visible="false"]
[image layer="1" x="-350"  y="-100" width=" 800" height="400" storage="color/col1.png" name="a" zindex="4"]
[image layer="1" x="-250"  y="   0" width="1200" height="640" storage="color/col2.png" name="b" zindex="3"]
[image layer="1" x="-250"  y="   0" width="1400" height="800" storage="color/col3.png" name="c" zindex="2"]
[image layer="1" x="  30"  y="   0" width="2400" height="1400" storage="color/col4.png" name="d" zindex="1"]
[kanim keyframe="slideInA" name="a" time="1500"]
[kanim keyframe="slideInB" name="b" time="1500"]
[kanim keyframe="slideInC" name="c" time="1500"]
[kanim keyframe="slideInD" name="d" time="1500"]
[wa]
[bg3 time="0" storage="${img}"]
[kanim keyframe="slideOutA" name="a" time="1500"]
[kanim keyframe="slideOutB" name="b" time="1500"]
[kanim keyframe="slideOutC" name="c" time="1500"]
[kanim keyframe="slideOutD" name="d" time="1500"]
[wa]
[freeimage layer="1"]
[layopt layer="message0" visible="true"]
[layopt layer="fix"      visible="true"]
`
  }
  return `[bg3 storage="${img}" method="${method}" time="${time}"]`
}

export const createCharacterShowMessage = (
  name: string,
  face: string | undefined,
  time: number,
  bottom: number,
) =>
  hasFace(face)
    ? `[chara_show name="${escape(name)}" face="${escape(
        face,
      )}" time="${time}" bottom="${bottom}"]`
    : `[chara_show name="${escape(name)}" time="${time}" bottom="${bottom}"]`
export const createCharacterHideMessage = (name: string, time: number) =>
  `[chara_hide name="${escape(name)}" time="${time}"]`
export const createCharacterHideAllMessage = (time: number) =>
  `[chara_hide_all time="${time}"]`

export const createMTextZawaZawaMessage = () => {
  return `[mtext text="ざわ･･" layer="0" x="200" y="100" size="70" in_effect="wobble" time="0" color="0x000000" edge="0xffffff" wait="false"]
    [mtext text="ざわ･･" layer="0" x="460" y="300" size="70" in_effect="wobble" time="0" color="0x000000" edge="0xffffff" wait="false"]
    [mtext text="ざわ･･" layer="0" x="560" y="100" size="70" in_effect="wobble" time="0" color="0x000000" edge="0xffffff" wait="false"]
    [mtext text="ざわ･･" layer="0" x="140" y="300" size="70" in_effect="wobble" time="0" color="0x000000" edge="0xffffff"]
    `
}
export const createMTextMessage = (text: string) => {
  return `[mtext text="${text}" layer="0" x="5" y="5" size="40" in_effect="fadeInRightBig" time="0" color="0xc0006f" edge="0xffffff" fadeout="false" name="mtext"]`
}
