import cookieSession from './cookieSession'
import cookieSessionRefresh from './cookieSessionRefresh'

export default (handler: any) => cookieSession(cookieSessionRefresh(handler))
