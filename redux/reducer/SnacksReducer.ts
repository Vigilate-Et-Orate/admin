import {
  TSnacksActions,
  TSnacksState,
  ISnacksEnqueue,
  ISnacksClose,
  ISnacksRemove,
} from 'types/Snacks'
import CONST from '../constants'

const initialState: TSnacksState = {
  notifications: [],
}

const snacksReducer = (state = initialState, action: TSnacksActions) => {
  let act: any
  switch (action.type) {
    case CONST.SNACKS.ENQUEUE_SNACK:
      act = action as ISnacksEnqueue
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            key: act.key,
            ...act.notification,
          },
        ],
      }

    case CONST.SNACKS.CLOSE_SNACK:
      act = action as ISnacksClose
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          act.dismissAll || notification.key === act.key
            ? { ...notification, dismissed: true }
            : { ...notification }
        ),
      }

    case CONST.SNACKS.REMOVE_SNACK:
      act = action as ISnacksRemove
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.key !== act.key
        ),
      }

    default:
      return state
  }
}

export default snacksReducer
