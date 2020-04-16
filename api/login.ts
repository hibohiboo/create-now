import commonMiddleware from '../src/utils/middleware/commonMiddleware'
import { verifyIdToken } from '../src/utils/auth/firebaseAdmin'
import { NextApiRequest, NextApiResponse } from 'next'

// req type: CookieSession?
const handler = async (req: any, res: NextApiResponse) => {
  if (!req.body) {
    return res.status(400)
  }

  const { token } = req.body

  try {
    const decodedToken = await verifyIdToken(token)
    req.session.decodedToken = decodedToken
    req.session.token = token
    return res.status(200).json({ status: true, decodedToken })
  } catch (error) {
    return res.status(500).json({ error })
  }
}

export default commonMiddleware(handler)
