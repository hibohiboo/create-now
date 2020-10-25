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
import type { SelectedCard } from '~/store/modules/hakoniwaModule/card'
import type { HakoniwaState } from '../../index'
const CARD_BACK = './assets/images/trump/z02.gif'

const getCanvasBlob = (canvas): Promise<Blob> =>
  new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)))

export default (state: HakoniwaState) => ({
  createZip: () => {
    createZip(state.selectedCards)
  },
})

const createZip = async (cards: SelectedCard[]) => {
  const files: File[] = []
  const mappedList = await Promise.all(
    cards.map(async (c) => {
      const target = document.getElementById(`card-${c.id}`)
      const canvas = await html2canvas(target)
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
  const listA = mappedList.filter(
    (c) => c.tags.includes('常時') && c.type !== 'アイテム',
  )
  files.push(createCardStack('常時スキル山札', listA))
  const listB = mappedList.filter((c) => c.type === 'アイテム')
  files.push(createCardStack('アイテム山札', listB))
  const listC = mappedList.filter(
    (c) => c.type !== 'アイテム' && !c.tags.includes('常時'),
  )
  files.push(createCardStack('スキル山札', listC))
  // files.push(createCardStack('山札', mappedList))

  FileArchiver.instance.save(files, moment().format('YYYYMMDD_HHmmss'))
}
const createCardStack = (stackName: string, cards: SelectedCard[]) => {
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

const createCardRoot = (doc: Document, cards: SelectedCard[]) => {
  const cardRoot = createElement(doc, 'node', [['name', 'cardRoot']])
  cards.forEach((card) => cardRoot.appendChild(createCard(doc, card)))
  return cardRoot
}
const createCard = (doc: Document, card: SelectedCard) => {
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
