import { Response, NextFunction } from 'express'
import 'reflect-metadata'
import { CookieRequest } from '../AuthController'
import { MetadataKeys } from './MetadataKeys'

export interface AuthMiddleware {
  (req: CookieRequest, res: Response, next: NextFunction): Promise<void>
}

export function auth(handler: AuthMiddleware): Function {
  return function(
    prototype: any,
    prop: string,
    desc: PropertyDescriptor
  ): void {
    Reflect.defineMetadata(MetadataKeys.auth, handler, prototype, prop)
  }
}
