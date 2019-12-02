import axios from 'axios'
import { validationResult } from 'express-validator'
import 'reflect-metadata'
import { Request, Response } from 'express'
import { get, use, controller } from './decorators'
import { transform } from '../middlewares'

const id = process.env.APP_ID_RECIPES
const key = process.env.APP_KEY_RECIPES

export interface RecipesRequest {
  q: string
  from?: string
  diet?: string
  health?: string[]
  calories?: string
}

@controller()
class ApiController {
  @get('/recipes')
  @use(transform)
  async fetchRecipes(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ error: "query param 'q' not provided" })
      return
    }

    try {
      if (
        typeof id === 'string' &&
        typeof key === 'string' &&
        typeof req.query === 'string' //change
      ) {
        const result = await axios.get(
          `https://api.edamam.com/search${req.query}&app_id=${id}&app_key=${key}`
        )
        if (result.status === 200) {
          res.status(200).send(result.data)
        } else {
          console.log(result)
          res.status(404).send({ error: 'Failed to fetch Edamam data' })
        }
      } else {
        throw new Error('Edamam credentials unaccessible') //change
      }
    } catch (err) {
      // console.log(err)
      res.status(500).send({ error: 'Internal Server Error' })
    }
  }
}

/*

result.data -> structure

{
  q: 'chicken',
  from: 0,
  to: 10,
  more: true,
  count: 168103,
  hits: [
    { recipe: [Object], bookmarked: false, bought: false },
    { recipe: [Object], bookmarked: false, bought: false },
    { recipe: [Object], bookmarked: false, bought: false },    
  ]
}
*/
