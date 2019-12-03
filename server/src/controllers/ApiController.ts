import axios, { AxiosRequestConfig } from 'axios'
import { validationResult } from 'express-validator'
import 'reflect-metadata'
import { Request, Response } from 'express'
import { get, post, use, controller } from './decorators'
import { transformQuery, transformBody } from '../middlewares'
import { recipesValidator, lineValidator, recipeValidator } from '../validators'

const idR = process.env.APP_ID_RECIPES
const keyR = process.env.APP_KEY_RECIPES
const idA = process.env.APP_ID_ANALYSIS
const keyA = process.env.APP_KEY_ANALYSIS

export interface ApiRequestQuery {
  q: string
  from?: string
  diet?: string
  health?: string[]
  calories?: string
  ingr?: string
}

export interface ApiRequestBody {
  title: string
  ingr: string
}

export interface ApiRequestBodyTransformed {
  title: string
  ingr: string[]
}

@controller()
class ApiController {
  @get('/recipes')
  @use(recipesValidator, transformQuery)
  async fetchRecipes(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ error: "query param 'q' not provided" })
      return
    }

    try {
      if (
        typeof idR === 'string' &&
        typeof keyR === 'string' &&
        typeof req.query === 'string'
      ) {
        const result = await axios.get(
          `https://api.edamam.com/search${req.query}&app_id=${idR}&app_key=${keyR}`
        )
        if (result.status === 200) {
          res.status(200).send(result.data)
          return
        } else {
          throw new Error('failed to fetch edamam')
        }
      } else {
        throw new Error('invalid: id, key or query for API')
      }
    } catch (err) {
      // got unsuccesful response from api
      if (err.response) {
        if (err.response.status === 404) {
          res.status(404).send({ error: 'failed to fetch edamam' })
          return
        }
      } else {
        // no response from api || credentials OR query error || unknown error
        console.log(err.message)
        res.status(500).send({ error: 'internal server error' })
        return
      }
    }
  }

  @get('/recipes/analysis/line')
  @use(lineValidator, transformQuery)
  async lineAnalysis(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({ error: "query param 'ingr' not provided" })
      return
    }
    try {
      if (
        typeof idA === 'string' &&
        typeof keyA === 'string' &&
        typeof req.query === 'string'
      ) {
        const result = await axios.get(
          `https://api.edamam.com/api/nutrition-data${req.query}&app_id=${idA}&app_key=${keyA}`
        )
        if (result.status === 200) {
          res.status(200).send(result.data)
          return
        } else {
          throw new Error('failed to fetch edamam')
        }
      } else {
        throw new Error('invalid: id, key or query for API')
      }
    } catch (err) {
      // got unsuccesful response from api
      if (err.response) {
        if (err.response.status === 404) {
          res.status(404).send({ error: 'failed to fetch edamam' })
          return
        } else if (err.response.status === 422) {
          res.status(422).send({ error: 'edamam failed to parse data' })
          return
        } else if (err.response.status === 555) {
          res.status(555).send({ error: 'edamam failed to parse data' })
          return
        }
      } else {
        // no response from api || credentials OR query error || unknown error
        console.log(err.message)
        res.status(500).send({ error: 'internal server error' })
        return
      }
    }
  }

  @post('/recipes/analysis/recipe')
  @use(recipeValidator, transformBody)
  async recipeAnalysis(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res
        .status(422)
        .send({ error: "fields 'title' and 'ingr' should be provided" })
      return
    }
    try {
      if (
        typeof idA === 'string' &&
        typeof keyA === 'string' &&
        Array.isArray(req.body.ingr)
      ) {
        const config: AxiosRequestConfig = {
          url: `https://api.edamam.com/api/nutrition-details?app_id=${idA}&app_key=${keyA}`,
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          data: req.body
        }
        const result = await axios(config)
        if (result.status === 200) {
          res.status(200).send(result.data)
          return
        } else {
          throw new Error('failed to fetch edamam')
        }
      } else {
        throw new Error('invalid: id, key or body for API')
      }
    } catch (err) {
      // got unsuccesful response from api
      if (err.response) {
        if (err.response.status === 404) {
          res.status(404).send({ error: 'failed to fetch edamam' })
          return
        } else if (err.response.status === 422) {
          res.status(422).send({ error: 'edamam failed to parse data' })
          return
        } else if (err.response.status === 555) {
          res.status(555).send({ error: 'edamam failed to parse data' })
          return
        }
      } else {
        // no response from api || credentials OR body error || unknown error
        console.log(err.message)
        res.status(500).send({ error: 'internal server error' })
        return
      }
    }
  }
}
