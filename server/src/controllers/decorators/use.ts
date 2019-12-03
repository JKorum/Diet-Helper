import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'
import 'reflect-metadata'
import { ValidationChain } from 'express-validator'

export function use(
  validator: ValidationChain | null,
  handler: RequestHandler | null
): Function {
  return function(prototype: any, prop: string, desc: PropertyDescriptor) {
    if (validator) {
      const validators: ValidationChain[] =
        Reflect.getMetadata(MetadataKeys.validators, prototype, prop) || []
      Reflect.defineMetadata(
        MetadataKeys.validators,
        [...validators, validator],
        prototype,
        prop
      )
    }

    if (handler) {
      const middlewares: RequestHandler[] =
        Reflect.getMetadata(MetadataKeys.middlewares, prototype, prop) || []

      Reflect.defineMetadata(
        MetadataKeys.middlewares,
        [...middlewares, handler],
        prototype,
        prop
      )
    }
  }
}
