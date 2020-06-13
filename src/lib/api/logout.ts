import { NextApiResponse } from 'next'
import commonMiddleware from '../../utils/middleware/commonMiddleware'
import type { SessionRequest } from './login'
// req type: CookieSession?

const handler = (req: SessionRequest, res: NextApiResponse) => {
  // Destroy the session.
  // https://github.com/expressjs/cookie-session#destroying-a-session
  req.session = null
  res.status(200).json({ status: true })
}

export default commonMiddleware(handler)
