import {
  ApiRequestBody,
  ApiRequestBodyTransformed
} from '../controllers/ApiController'

export const buildBody = (data: ApiRequestBody): ApiRequestBodyTransformed => {
  return {
    title: data.title.toLowerCase(),
    ingr: data.ingr.split(',').map(item => item.trim().toLowerCase())
  }
}
