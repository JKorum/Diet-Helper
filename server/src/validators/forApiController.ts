import { query, body } from 'express-validator'

export const recipesValidator = query('q')
  .notEmpty()
  .isString()

export const lineValidator = query('ingr')
  .notEmpty()
  .isString()

export const recipeValidator = body(['title', 'ingr'])
  .isString()
  .trim()
  .notEmpty()
