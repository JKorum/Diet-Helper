import { RequestHandler } from 'express'
import { MetadataKeys } from './MetadataKeys'
import 'reflect-metadata'

export function use(handler: RequestHandler): Function {
  return function(prototype: any, prop: string, desc: PropertyDescriptor) {
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
