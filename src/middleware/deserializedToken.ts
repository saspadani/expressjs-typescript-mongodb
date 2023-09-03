import { type Request, type Response, type NextFunction } from 'express'
import { verifyJWT } from '../utils/jwt'

const deserializedToken = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.replace(/^Bearer\s/, '')
  if (!accessToken) {
    next()
    return
  }

  const token: any = verifyJWT(accessToken)
  if (token.decoded) {
    res.locals.user = token.decoded
    next()
    return
  }

  if (token.expired) {
    next()
    return
  }

  next()
}

export default deserializedToken
