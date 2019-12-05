import { Request, Response } from 'express'
import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'
import { post, get, controller, use, auth } from './decorators'
import { User, QueriedUserDocument } from '../database/models'
import { registerValidator, loginValidator } from '../validators'
import { authHandler } from '../middlewares'
import chalk from 'chalk'

export interface CookieRequest extends Request {
  session?: { [key: string]: any }
  user?: QueriedUserDocument
}

interface RegisterReqBody {
  name: string
  email: string
  password: string
}

interface LoginReqBody {
  email: string
  password: string
}

@controller()
class AuthController {
  @post('/register')
  @use(registerValidator, null)
  async register(req: CookieRequest, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({
        error:
          'required: name (min 2 chars), email (valid) and password (min 6 chars)'
      })
      return
    }
    try {
      if (req.session) {
        const data: RegisterReqBody = req.body
        const user = new User(data)
        req.session.id = user.id

        await user.save()
        res.status(201).send()
        return
      } else {
        throw new Error(chalk.black.bgRed('req.session inaccessible'))
      }
    } catch (err) {
      if (err.code && err.code === 11000) {
        res.status(422).send({ error: `email already in used` })
        return
      }
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }

  @post('/login')
  @use(loginValidator, null)
  async login(req: CookieRequest, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({
        error: 'required: email (valid) and password (min 6 chars)'
      })
      return
    }
    try {
      const { email, password } = req.body as LoginReqBody
      const user = await User.findOne({ email })
      if (!user) {
        res.status(401).send({ error: 'authorization failed' })
        return
      } else {
        const match = await bcrypt.compare(password, user.password)
        if (!match) {
          res.status(401).send({ error: 'authorization failed' })
          return
        } else {
          if (req.session) {
            req.session.id = user.id
            res.status(200).send()
            return
          } else {
            throw new Error(chalk.black.bgRed('req.session inaccessible'))
          }
        }
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }

  @get('/logout')
  @auth(authHandler)
  logout(req: CookieRequest, res: Response): void {
    try {
      if (req.session) {
        req.session.reset()
        res.status(200).send()
        return
      } else {
        throw new Error(chalk.black.bgRed('req.session inaccessible'))
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }
}
