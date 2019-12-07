import { Response } from 'express'
import { validationResult } from 'express-validator'
import { controller, patch, auth, use, get } from './decorators'
import { CookieRequest } from './AuthController'
import { authHandler } from '../middlewares'
import { updateValidator } from '../validators'
import { User } from '../database/models'

interface UpdateReqBody {
  newName?: string
  newEmail?: string
  newPassword?: string
}

@controller()
class UserController {
  @patch('/users/update')
  @auth(authHandler)
  @use(updateValidator, null)
  async updateCredentials(req: CookieRequest, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({
        error:
          'optional: newName (min 2 chars), newEmail (valid) and newPassword (min 6 chars)'
      })
      return
    }

    try {
      const user = req.user
      if (!user) {
        res.status(500).send({ error: 'internal server error' })
        return
      } else {
        const { newName, newEmail, newPassword } = req.body as UpdateReqBody
        if (newName && newEmail && newPassword) {
          user.name = newName
          user.email = newEmail
          user.password = newPassword
          await user.save()
          const { id, name, email } = user
          res.status(200).send({ id, name, email })
          return
        }
        if (newName) {
          await user.update({ name: newName })
        }
        if (newEmail) {
          await user.update({ email: newEmail })
        }
        if (newPassword) {
          user.password = newPassword
          await user.save()
        }

        const updated = await User.findById(user.id).select('-password')
        if (!updated) {
          throw new Error('failed to load updated user')
        } else {
          const { id, name, email } = updated
          res.status(200).send({ id, name, email })
          return
        }
      }
    } catch (err) {
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }

  @get('/users/synchronize')
  @auth(authHandler)
  async synchronize(req: CookieRequest, res: Response): Promise<void> {
    try {
      const user = req.user
      if (!user) {
        throw new Error('failed to load user')
      } else {
        const data = await user.populate('recipes').execPopulate()
        res.status(200).send(data)
        return
      }
    } catch (err) {
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }
}
