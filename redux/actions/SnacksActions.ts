import CONST from '../constants'
import { ISnackNotification, TSnacksActions, TKey } from 'types/Snacks'

export function enqueueSnack(notification: ISnackNotification): TSnacksActions {
  return {
    type: CONST.SNACKS.ENQUEUE_SNACK,
    notification: {
      ...notification,
      key: new Date().getTime() + Math.random(),
    },
  }
}

export function closeSnackbar(key: TKey): TSnacksActions {
  return {
    type: CONST.SNACKS.CLOSE_SNACK,
    dismissAll: !key,
    key,
  }
}

export function removeSnack(key: TKey): TSnacksActions {
  return {
    type: CONST.SNACKS.REMOVE_SNACK,
    key,
  }
}
