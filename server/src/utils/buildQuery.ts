import { ApiRequestQuery } from '../controllers/ApiController'

export const buildQuery = (data: ApiRequestQuery): string => {
  const { q, from, diet, health, calories, ingr } = data

  let result: string

  /* process query for api/analysis/line */
  if (typeof ingr === 'string') {
    result = `?ingr=${encodeURIComponent(ingr)}`
    return result.toLowerCase()
  }

  /* process query for api/recipes */
  result = `?q=${encodeURIComponent(q)}`

  if (typeof from === 'string') {
    result = result + `&from=${from}`
  }

  if (typeof diet === 'string') {
    result = result + `&diet=${diet}`
  }

  if (typeof calories === 'string') {
    result = result + `&calories=${encodeURIComponent(calories)}`
  }

  if (typeof health === 'string') {
    result = result + `&health=${health}`
  }

  if (Array.isArray(health)) {
    health.forEach(item => {
      result = result + `&health=${item}`
    })
  }

  return result.toLowerCase()
}
