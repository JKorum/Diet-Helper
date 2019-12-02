import { Request, Response, NextFunction } from 'express'
import { buildQuery } from '../utils'

export function transform(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const queryString = buildQuery(req.query)
  req.query = queryString
  next()
  return
}
