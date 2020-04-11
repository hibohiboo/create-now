import path from 'path'
import PdfPrinter from 'pdfmake'

export function createPdfBinary(pdfDoc, callback) {
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
