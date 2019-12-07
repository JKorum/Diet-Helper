import { Response } from 'express'
import { validationResult } from 'express-validator'
import { auth, controller, post, use, del } from './decorators'
import { authHandler } from '../middlewares'
import { CookieRequest } from './AuthController'
import { Recipe } from '../database/models'
import { userRecipeValidator } from '../validators'

@controller()
class RecipeController {
  @post('/recipes/save')
  @auth(authHandler)
  @use(userRecipeValidator, null)
  async create(req: CookieRequest, res: Response): Promise<void> {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      res.status(422).send({
        error: {
          required: {
            strings: ['label', 'image', 'source', 'url'],
            arrayOfStrings: [
              'dietLabels',
              'healthLabels',
              'cautions',
              'ingredientLines'
            ],
            numbers: ['yield', 'calories', 'totalWeight', 'totalTime']
          }
        }
      })
      return
    }
    try {
      const user = req.user
      if (!user) {
        throw new Error('failed to load user')
      } else {
        const data = req.body
        const recipe = new Recipe({ ...data, owner: user.id })
        await recipe.save()
        res.status(200).send(recipe)
        return
      }
    } catch (err) {
      console.log(err.message)
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }

  @del('/recipes/:id')
  @auth(authHandler)
  async deleteOne(req: CookieRequest, res: Response): Promise<void> {
    try {
      const user = req.user
      if (!user) {
        throw new Error('failed to load user')
      } else {
        const { id: userId } = user
        const { id } = req.params
        const recipe = await Recipe.findById(id)
        if (!recipe) {
          res.status(204).send()
          return
        } else {
          if (recipe.owner.toString() !== userId) {
            res.status(403).send({ error: 'access forbidden' })
            return
          } else {
            await recipe.remove()
            res.status(204).send()
            return
          }
        }
      }
    } catch (err) {
      if (err.kind && err.kind === 'ObjectId') {
        res.status(400).send({ error: 'url param: invalid value' })
        return
      } else {
        res.status(500).send({ error: 'internal server error' })
        return
      }
    }
  }

  @del('/recipes')
  @auth(authHandler)
  async deleteAll(req: CookieRequest, res: Response): Promise<void> {
    try {
      const user = req.user
      if (!user) {
        throw new Error('failed to load user')
      } else {
        await Recipe.deleteMany({ owner: user.id })
        res.status(204).send()
        return
      }
    } catch (err) {
      res.status(500).send({ error: 'internal server error' })
      return
    }
  }
}
