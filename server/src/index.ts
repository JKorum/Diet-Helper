import express from 'express'
import { config } from 'dotenv'
import { AppRouter } from './AppRouter'

config()

const app = express()
const port = process.env.PORT || 3003

import './controllers/ApiController'

// app.use(express.json())
app.use('/api', AppRouter.getInstance())

app.listen(port, () => {
  console.log(`server is running on port: ${port}`)
})
