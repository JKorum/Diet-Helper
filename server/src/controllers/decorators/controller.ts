import { RequestHandler } from 'express'
import { query, ValidationChain } from 'express-validator'
import { AppRouter } from '../../AppRouter'
import { MetadataKeys } from './MetadataKeys'
import { Methods } from './Methods'

export function controller(): Function {
  const router = AppRouter.getInstance()
  // class decorator ->
  return function(constructor: Function): void {
    // constructing routes handlers ->
    for (let key in constructor.prototype) {
      const method: Methods = Reflect.getMetadata(
        MetadataKeys.method,
        constructor.prototype,
        key
      )

      const path = Reflect.getMetadata(
        MetadataKeys.path,
        constructor.prototype,
        key
      )

      const middlewares: RequestHandler[] =
        Reflect.getMetadata(
          MetadataKeys.middlewares,
          constructor.prototype,
          key
        ) || []

      const routeHandler = constructor.prototype[key]

      const validators: ValidationChain[] =
        Reflect.getMetadata(
          MetadataKeys.validators,
          constructor.prototype,
          key
        ) || []

      router[method](path, validators, middlewares, routeHandler)
    }
  }
}
