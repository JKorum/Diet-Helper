import { RequestHandler } from 'express'
import { query } from 'express-validator'
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

      // temp -> extract logic in module
      const validator = [
        query('q')
          .notEmpty()
          .isString()
      ]

      router[method](path, validator, middlewares, routeHandler)
    }
  }
}
