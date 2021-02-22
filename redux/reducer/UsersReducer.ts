import constants from '@constants'
import {
  IUsersAdd,
  IUsersDelete,
  IUsersState,
  IUsersUpdate,
  TUsersActionsTypes,
} from 'types/User'

const initialState: IUsersState = {
  users: [],
  count: 0,
}

const usersReducer = (state = initialState, action: TUsersActionsTypes) => {
  let act: TUsersActionsTypes
  switch (action.type) {
    case constants.USERS.USERS_ADD:
      act = action as IUsersAdd
      return {
        ...state,
        Users: [...state.users, act.user],
        count: state.count + 1,
      }
    case constants.USERS.USERS_UPDATE:
      act = action as IUsersUpdate
      return { ...state, users: act.users, count: act.users.length }
    case constants.USERS.USERS_REMOVE:
      act = action as IUsersDelete
      const id = act.user._id
      const index = state.users.findIndex((elem) => elem._id === id)
      const newUsers = [
        ...state.users.slice(0, index),
        ...state.users.slice(index + 1),
      ]
      return { ...state, users: newUsers, count: state.count - 1 }
    default:
      return state
  }
}

export default usersReducer
