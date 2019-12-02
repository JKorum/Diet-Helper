import { RecipesRequest } from '../controllers/ApiController'

export const buildQuery = (data: RecipesRequest): string => {
  const { q, from, diet, health, calories } = data

  let result = `?q=${encodeURIComponent(q)}`

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
