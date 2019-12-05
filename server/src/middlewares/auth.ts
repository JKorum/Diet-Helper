import { Request, Response, NextFunction } from 'express'
import { CookieRequest } from '../controllers/AuthController'
import { User } from '../database/models'

export const authHandler = async (
  req: CookieRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!(req.session && req.session.id)) {
    res.status(401).send({ error: 'authorization failed' })
    return
  } else {
    try {
      const user = await User.findById(req.session.id).select('-password')
      if (!user) {
        res.status(401).send({ error: 'authorization failed' })
        return
      } else {
        req.user = user
        next()
        return
      }
    } catch (err) {
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }
}
