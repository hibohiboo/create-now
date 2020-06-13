import { NextApiRequest, NextApiResponse } from 'next'
import createPdfBinary from '../../src/lib/pdf/createPdfBinary'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const docDefinition = req.body
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send(binary)
  })
}
