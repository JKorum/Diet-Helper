import 'reflect-metadata'
import { Methods } from './Methods'
import { MetadataKeys } from './MetadataKeys'

function routeBinder(method: Methods): Function {
  // decorator factory ->
  return function(path: string): Function {
    // decorator ->
    return function(
      prototype: any,
      prop: string,
      desc: PropertyDescriptor
    ): void {
      Reflect.defineMetadata(MetadataKeys.method, method, prototype, prop)
      Reflect.defineMetadata(MetadataKeys.path, path, prototype, prop)
    }
  }
}

export const get = routeBinder(Methods.get)
export const post = routeBinder(Methods.post)
export const patch = routeBinder(Methods.patch)
