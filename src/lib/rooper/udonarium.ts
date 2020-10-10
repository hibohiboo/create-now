import { calcSHA256Async } from '~/lib/udonarium/FileReaderUtil'
import { MimeType } from '~/lib/udonarium/mimeType'
import {
  FileArchiver,
  convertDocToXML,
  createDoc,
  createElement,
} from '../fileArchiver'
type Character = { name: CharacterName; canvas: any }
type CharacterName =
  | 'boy' //  男子学生
  | 'gir' //  女子学生
  | 'rmd' //  お嬢様
  | 'shr' //  巫女
  | 'kg' //  刑事
  | 'off' //  サラリーマン
  | 'info' //  情報屋
  | 'doc' //  医者
  | 'pat' //  患者
  | 'rep' //  委員長
  | 'mys' //  イレギュラー
  | 'ali' //  異世界人
  | 'god' //  神格
  | 'idol' //  アイドル
  | 'jou' //  マスコミ
  | 'boss' //  大物
  | 'nurse' //  ナース
  | 'hen' //  手先
  | 'gak' //  学者
  | 'ill' //  幻想
  | 'fore' //  鑑識官
  | 'ai' //  A.I.
  | 'tea' //  教師
  | 'new' //  転校生
  | 'mil' //  軍人
  | 'cat' //  黒猫
  | 'lit' //  女の子
  | 'Sister' //  妹
  | 'CopyCat' //  コピーキャット
  | 'Guru' //  教祖
  | 'SacredTree' //  ご神木

export const createZip = async (characters: Character[]) => {
  const files: File[] = []
  await Promise.all(
    characters.map(async (c) => {
      const blob = await getCanvasBlob(c.canvas.toCanvas())
      const identifier = await calcSHA256Async(blob)
      files.push(
        new File([blob], identifier + '.' + MimeType.extension(blob.type), {
          type: blob.type,
        }),
      )
      const file = characterFactory(identifier, c)
      if (file) {
        files.push(file)
      }
    }),
  )

  FileArchiver.instance.save(files, 'scenario')
}
const getCanvasBlob = (canvas): Promise<Blob> =>
  new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)))

const characterFactory = (identifier: string, c: Character) => {
  switch (c.name) {
    case 'boy':
      return createCharacter(identifier, '男子学生', '学校', '01')
    case 'gir':
      return createCharacter(identifier, '女子学生', '学校', '02')
    case 'rmd':
      return createCharacter(identifier, 'お嬢様', '学校', '03')
    case 'shr':
      return createCharacter(identifier, '巫女', '神社', '04')
    case 'kg':
      return createCharacter(identifier, '刑事', '都市', '05')
    case 'off':
      return createCharacter(identifier, 'サラリーマン', '都市', '06')
    case 'info':
      return createCharacter(identifier, '情報屋', '都市', '07')
    case 'doc':
      return createCharacter(identifier, '医者', '病院', '08')
    case 'pat':
      return createCharacter(identifier, '患者', '病院', '09')
    case 'rep':
      return createCharacter(identifier, '委員長', '学校', '10')
    case 'mys':
      return createCharacter(identifier, 'イレギュラー', '学校', '11')
    case 'ali':
      return createCharacter(identifier, '異世界人', '神社', '12')
    case 'god':
      return createCharacter(identifier, '神格', '神社', '13')
    case 'idol':
      return createCharacter(identifier, 'アイドル', '都市', '14')
    case 'jou':
      return createCharacter(identifier, 'マスコミ', '都市', '15')
    case 'boss':
      return createCharacter(identifier, '大物', '都市', '16')
    case 'nurse':
      return createCharacter(identifier, 'ナース', '病院', '17')
    case 'hen':
      return createCharacter(identifier, '手先', '神社', '18')
    case 'gak':
      return createCharacter(identifier, '学者', '病院', '19')
    case 'ill':
      return createCharacter(identifier, '幻想', '神社', '20')
    case 'fore':
      return createCharacter(identifier, '鑑識官', '都市', '21')
    case 'ai':
      return createCharacter(identifier, 'A.I.', '都市', '22')
    case 'tea':
      return createCharacter(identifier, '教師', '学校', '23')
    case 'new':
      return createCharacter(identifier, '転校生', '学校', '24')
    case 'mil':
      return createCharacter(identifier, '軍人', '病院', '25')
    case 'cat':
      return createCharacter(identifier, '黒猫', '神社', '26')
    case 'lit':
      return createCharacter(identifier, '女の子', '学校', '27')
    // 未実装キャラはとりあえず男子学生にする
  }
}

const createCharacter = (
  identifier: string,
  charName,
  firstPosition,
  cardNumber,
) => {
  const doc = createDoc()
  const rooperCard = createElement(doc, 'rooper-card', [
    ['location.name', 'table'],
    ['location.x', '600'],
    ['location.y', '950'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
  ])
  // #char
  const char = createElement(doc, 'data', [['name', 'rooper-card']])
  const image = createElement(doc, 'data', [['name', 'image']])
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ])
  const front = createElement(
    doc,
    'data',
    [
      ['name', 'front'],
      ['type', 'image'],
    ],
    identifier,
  )
  const back = createElement(
    doc,
    'data',
    [
      ['name', 'back'],
      ['type', 'image'],
    ],
    `./assets/images/tragedy_commons_5th/chara_cards/character_${cardNumber}_0.png`,
  )
  image.appendChild(imageIdentifier)
  image.appendChild(front)
  image.appendChild(back)
  char.appendChild(image)
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], charName)
  const size = createElement(doc, 'data', [['name', 'size']], '3')
  const pos = createElement(doc, 'data', [['name', '位置']], firstPosition)
  const fPos = createElement(doc, 'data', [['name', '初期位置']], firstPosition)

  const yuko = createElement(
    doc,
    'data',
    [
      ['name', '友好'],
      ['type', 'numberResource'],
      ['currentValue', '0'],
    ],
    '0',
  )
  const huan = createElement(
    doc,
    'data',
    [
      ['name', '不安'],
      ['type', 'numberResource'],
      ['currentValue', '0'],
    ],
    '0',
  )
  const anyaku = createElement(
    doc,
    'data',
    [
      ['name', '暗躍'],
      ['type', 'numberResource'],
      ['currentValue', '0'],
    ],
    '0',
  )
  common.appendChild(name)
  common.appendChild(size)
  common.appendChild(pos)
  common.appendChild(fPos)
  common.appendChild(yuko)
  common.appendChild(huan)
  common.appendChild(anyaku)

  char.appendChild(common)
  const detail = createElement(doc, 'data', [['name', 'detail']])

  char.appendChild(detail)
  rooperCard.appendChild(char)
  // const cp = createElement(doc, 'chat-palette', [['dicebot', '']]);
  // rooperCard.appendChild(cp);
  doc.appendChild(rooperCard)
  const sXML = convertDocToXML(doc)
  return new File([sXML], `${charName}.xml`, { type: 'text/plain' })
}
type Incident = { day: number; incident: string }
const createNote = ({
  set,
  numberOfLoops,
  daysInOneLoop,
  extra,
  incidents,
}: {
  set: string
  numberOfLoops: number
  daysInOneLoop: number
  extra: string
  incidents: Incident[]
}) => {
  const doc = createDoc()
  const textNote = createElement(doc, 'text-note', [
    ['password', ''],
    ['location.x', '210'],
    ['location.y', '150'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['location.name', 'table'],
  ])
  const note = createElement(doc, 'data', [['name', 'text-note']])
  const image = createElement(doc, 'data', [['name', 'image']])
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ])
  image.appendChild(imageIdentifier)
  note.appendChild(image)

  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'title']], '公開シート')
  const height = createElement(doc, 'data', [['name', 'height']], '3')
  const width = createElement(doc, 'data', [['name', 'width']], '6')
  const fontsize = createElement(doc, 'data', [['name', 'fontsize']], '5')
  const text = createElement(
    doc,
    'data',
    [['name', 'text']],
    `${set}
ループ回数: ${numberOfLoops} / 1ループ日数: ${daysInOneLoop}日

${extra}

[事件予定]

${incidents.reverse().map(incidentToString).join('\n')}
  `,
  )
  common.appendChild(name)
  common.appendChild(height)
  common.appendChild(width)
  common.appendChild(fontsize)
  common.appendChild(text)
  note.appendChild(common)
  const detail = createElement(doc, 'data', [['name', 'detail']])
  note.appendChild(detail)

  textNote.appendChild(note)
  doc.appendChild(textNote)
  const sXML = convertDocToXML(doc)
  return new File([sXML], `公開シート.xml`, { type: 'text/plain' })
}

const incidentToString = ({ day, incident }: Incident) =>
  `${day}日目：${incident}`

const incidentFactory = (incident: string) => {
  switch (incident) {
    case 'MurderPlan':
      return '殺人計画'
    case 'LightOfTheAvenger':
      return '復讐者の灯火'
    case 'APlaceToProtect':
      return '守るべき場所'
    case 'TheSealedItem':
      return '封印されしモノ'
    case 'SignWithMe':
      return '僕と契約しようよ！'
    case 'ChangeOfFuture':
      return '未来改変プラン'
    case 'GiantTimeBomb':
      return '巨大時限爆弾Xの存在'
    case 'AnUnsettlingRumour':
      return '不穏な噂'
    case 'AHideousScript':
      return '最低の却本'
    case 'ShadowOfTheRipper':
      return '切り裂き魔の影'
    case 'CircleOfFriends':
      return '友情サークル'
    case 'ALoveAffair':
      return '恋愛風景'

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''

    case '':
      return ''
  }
}
