import { NextApiRequest, NextApiResponse } from 'next'
import createPdfBinary from './utils/createPdfBinary'

export default (req: NextApiRequest, res: NextApiResponse) => {
  const docDefinition = req.body
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(binary)
  })
}
