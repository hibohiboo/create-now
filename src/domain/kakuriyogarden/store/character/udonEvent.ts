import html2canvas from 'html2canvas'
import moment from 'moment'
import { calcSHA256Async } from '~/lib/udonarium/FileReaderUtil'
import { MimeType } from '~/lib/udonarium/mimeType'
import {
  FileArchiver,
  convertDocToXML,
  createDoc,
  createElement,
} from '~/lib/fileArchiver'

import { Magic } from '../../classes/gemory/magic'

const CARD_BACK = './assets/images/trump/z02.gif'

const getCanvasBlob = (canvas): Promise<Blob> =>
  new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)))

  // TODO: 一旦あきらめ。画像化素直にしたほうがはやいかも。

export const createZip = async (name:string, cards: Magic[]) => {
  const files: File[] = []
  const mappedList = await Promise.all(
    cards.map(async (c) => {
      const target = document.getElementById(`card-${c.id}`)

      // そのままだと真っ白になってしまったので一度innerframeに入れてみる ... 入れると表示はされるが、CSSが効いていない模様。
      // const copy_ele = target.cloneNode(true)  as HTMLElement;
      // const canvas_handler = document.getElementById('canvas_handler') as HTMLIFrameElement
      // canvas_handler.contentDocument.body.appendChild(copy_ele);
      // canvas_handler.height = target.scrollHeight.toString()
      // canvas_handler.width = target.scrollWidth.toString()
      const canvas = await html2canvas(target, {useCORS: true, height: 342,width:242, removeContainer: false})
      // canvas_handler.contentDocument.body.removeChild(copy_ele)

      const blob = await getCanvasBlob(canvas)
      const identifier = await calcSHA256Async(blob)
      files.push(
        new File([blob], identifier + '.' + MimeType.extension(blob.type), {
          type: blob.type,
        }),
      )

      return { ...c, identifier }
    }),
  )

  files.push(createCardStack(`${name}の魔法山札`, mappedList))

  FileArchiver.instance.save(files, moment().format('YYYYMMDD_HHmmss'))
}

type MagicWithIdentifer = Magic & {identifier: string}

const createCardStack = (stackName: string, cards: MagicWithIdentifer[]) => {
  const doc = createDoc()
  const cardStackWrapper = createElement(doc, 'card-stack', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
    ['isShowTotal', 'true'],
  ])

  cardStackWrapper.appendChild(createCardStackElment(doc, stackName))
  cardStackWrapper.appendChild(createCardRoot(doc, cards))
  doc.appendChild(cardStackWrapper)
  const sXML = convertDocToXML(doc)
  return new File([sXML], `${stackName}.xml`, { type: 'text/plain' })
}

const createCardStackElment = (doc: Document, stackName: string) => {
  // #card-stack
  const cardStack = createElement(doc, 'data', [['name', 'card-stack']])
  const image = createElement(doc, 'data', [['name', 'image']])
  const imageIdentifier = createElement(doc, 'data', [
    ['name', 'imageIdentifier'],
    ['type', 'image'],
  ])
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], stackName)
  const detail = createElement(doc, 'data', [['name', 'detail']])
  image.appendChild(imageIdentifier)
  common.appendChild(name)
  cardStack.appendChild(image)
  cardStack.appendChild(common)
  cardStack.appendChild(detail)

  return cardStack
}

const createCardRoot = (doc: Document, cards: MagicWithIdentifer[]) => {
  const cardRoot = createElement(doc, 'node', [['name', 'cardRoot']])
  cards.forEach((card) => cardRoot.appendChild(createCard(doc, card)))
  return cardRoot
}
const createCard = (doc: Document, card: MagicWithIdentifer) => {
  const cardWrapper = createElement(doc, 'card', [
    ['location.name', 'table'],
    ['location.x', '50'],
    ['location.y', '500'],
    ['posZ', '0'],
    ['rotate', '0'],
    ['roll', '0'],
    ['zindex', '0'],
    ['state', '0'],
  ])
  const cardData = createElement(doc, 'data', [['name', 'card']])
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
    card.identifier,
  )
  const back = createElement(
    doc,
    'data',
    [
      ['name', 'back'],
      ['type', 'image'],
    ],
    CARD_BACK,
  )
  image.appendChild(imageIdentifier)
  image.appendChild(front)
  image.appendChild(back)
  const common = createElement(doc, 'data', [['name', 'common']])
  const name = createElement(doc, 'data', [['name', 'name']], card.name)
  const size = createElement(doc, 'data', [['name', 'size']], '2')
  const detail = createElement(doc, 'data', [['name', 'detail']])
  image.appendChild(imageIdentifier)
  common.appendChild(name)
  common.appendChild(size)
  cardData.appendChild(image)
  cardData.appendChild(common)
  cardData.appendChild(detail)
  cardWrapper.appendChild(cardData)
  return cardWrapper
}
