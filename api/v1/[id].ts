import { NextApiRequest, NextApiResponse } from 'next'
// API側だと、 ~/ のオプションが適用されていない模様。。。
import createPdfBinary from '../../src/lib/pdf/createPdfBinary'
import login from '../../src/lib/api/login'
import logout from '../../src/lib/api/logout'

const pdf = (req: NextApiRequest, res: NextApiResponse) => {
  const docDefinition = req.body
  createPdfBinary(docDefinition, (binary) => {
    res.setHeader('Content-Type', 'application/pdf')
    res.status(200).send(binary)
  })
}

export default (req: NextApiRequest, res: NextApiResponse) => {
  const id = req.query.id
  if (id === 'pdf') {
    pdf(req, res)
    return
  }
  if (id === 'login') {
    login(req, res)
    return
  }
  if (id === 'logout') {
    logout(req, res)
    return
  }
  res.status(404)
}
