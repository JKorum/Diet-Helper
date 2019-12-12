import { ActionsTypes, UserActedActions } from '.'

export const trackReducer = (
  state = false,
  action: UserActedActions
): boolean => {
  switch (action.type) {
    case ActionsTypes.USER_ACTED_TRUE:
      return true
    case ActionsTypes.USER_ACTED_FALSE:
      return false
    default:
      return state
  }
}
