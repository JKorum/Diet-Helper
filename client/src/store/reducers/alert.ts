import { AlertState, AlertActions, ActionsTypes } from './types'

export const alertReducer = (
  state: AlertState | null = null,
  action: AlertActions
): AlertState | null => {
  switch (action.type) {
    case ActionsTypes.SET_ALERT:
      return action.payload
    case ActionsTypes.REMOVE_ALERT:
    case ActionsTypes.ACCOUNT_DELETED:
      return null
    default:
      return state
  }
}
