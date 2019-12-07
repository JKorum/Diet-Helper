import { config } from 'dotenv'
import express from 'express'
import sessions from 'client-sessions'
import chalk from 'chalk'
import { AppRouter } from './AppRouter'

config()

import './database/config'

const app = express()
const port = process.env.PORT || 3003

import './controllers/ApiController'
import './controllers/AuthController'
import './controllers/UserController'
import './controllers/RecipeController'

const pass = process.env.COOKIE_PASS

if (!pass) {
  console.log(chalk.black.bgRed('env variable COOKIE_PASS inaccessible'))
  process.exit(1)
} else if (typeof pass === 'string') {
  app.use(
    sessions({
      cookieName: 'session',
      secret: pass,
      duration: 24 * 60 * 60 * 1000,
      cookie: {
        httpOnly: true
      }
    })
  )
}

app.use(express.json())
app.use('/api', AppRouter.getInstance())

app.listen(port, () => {
  console.log(chalk.black.bgGreen(`Server is running on port: ${port}`))
})
