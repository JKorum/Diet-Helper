import { body } from 'express-validator'

export const userRecipeValidator = [
  body(['label', 'image', 'source', 'url'])
    .isString()
    .trim()
    .notEmpty(),
  body(['dietLabels', 'healthLabels', 'cautions', 'ingredientLines'])
    .isArray()
    .custom((field: any[]): boolean => {
      field.forEach(item => {
        if (typeof item !== 'string') {
          throw new Error('arrays fields: invalid value types')
        }
      })
      return true
    }),
  body(['yield', 'calories', 'totalWeight', 'totalTime'])
    .notEmpty()
    .custom((field: any): boolean => {
      if (typeof field !== 'number') {
        throw new Error('numeric fields: invalid value types')
      }
      return true
    })
]
