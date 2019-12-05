import { body } from 'express-validator'

export const updateValidator = [
  body('newName')
    .isString()
    .trim()
    .isLength({ min: 2 })
    .optional(),
  body('newEmail')
    .isString()
    .trim()
    .isEmail()
    .normalizeEmail()
    .optional(),
  body('newPassword')
    .isString()
    .trim()
    .isLength({ min: 6 })
    .optional()
]
