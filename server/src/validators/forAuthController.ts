import { body } from 'express-validator'

export const registerValidator = [
  body('name')
    .isString()
    .trim()
    .isLength({ min: 2 }),
  body('email')
    .isString()
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password')
    .isString()
    .trim()
    .isLength({ min: 6 })
]

export const loginValidator = [
  body('email')
    .isString()
    .trim()
    .isEmail()
    .normalizeEmail(),
  body('password')
    .isString()
    .trim()
    .isLength({ min: 6 })
]
