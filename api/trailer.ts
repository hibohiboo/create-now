import { NextApiRequest, NextApiResponse } from 'next'
import path from 'path'
import PdfPrinter from 'pdfmake'
import { Scenario } from '../src/store/modules/scenarioModule'

function createPdfBinary(pdfDoc, callback) {
  const baseDir = 'fonts/'
  const gPath = path.resolve(baseDir + 'ipaexg.ttf')
  const mPath = path.resolve(baseDir + 'ipaexm.ttf')
  const fontDescriptors = {
    IPASerif: {
      normal: mPath,
      bold: mPath,
      italics: mPath,
      bolditalics: mPath,
    },
    IPAGothic: {
      normal: gPath,
      bold: gPath,
      italics: gPath,
      bolditalics: gPath,
    },
  }
  const printer = new PdfPrinter(fontDescriptors)
  const doc = printer.createPdfKitDocument(pdfDoc)

  const chunks = []

  doc.on('data', (chunk) => {
    chunks.push(chunk)
  })
  doc.on('end', () => {
    const result = Buffer.concat(chunks)
    callback('data:application/pdf;base64,' + result.toString('base64'))
  })
  doc.end()
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const scenario: Scenario = req.body
  const docDefinition = {
    content: [
      { text: scenario.copy1, margin: [0, 25, 0, 5] },
      { text: scenario.copy2 },
      {
        svg:
          '<svg width="1000" height="50" viewBox="0 0 1000 50"><line x1="0" y1="25" x2="1000" y2="25" /></svg>',
      },
      { text: scenario.title, fontSize: 55, font: 'IPASerif' },
      {
        text: '.' + scenario.titleRuby,
        fontSize: 24,
        alignment: 'left',
        font: 'IPASerif',
      },
      { text: scenario.subTitle, fontSize: 20, font: 'IPASerif' },
      {
        text: `PC人数:${scenario.pcNumber}    リミット: ${scenario.limit}    ${scenario.type}`,
        margin: [0, 50, 0, 0],
      },
    ],
    defaultStyle: {
      font: 'IPAGothic',
      alignment: 'center',
    },
  }
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/json')

    res.status(200).send(binary)
  })
}
