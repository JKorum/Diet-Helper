import { Request, Response, NextFunction } from 'express'
import { buildQuery, buildBody } from '../utils'

export function transformQuery(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const queryString = buildQuery(req.query)
  req.query = queryString
  next()
  return
}

export function transformBody(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const body = buildBody(req.body)
  req.body = body
  next()
  return
}
