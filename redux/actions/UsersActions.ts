import constants from '@constants'
import { TUser, TUsersActionsTypes } from 'types/User'

export function addUsers(user: TUser): TUsersActionsTypes {
  return {
    type: constants.USERS.USERS_ADD,
    user,
  }
}

export function deleteUsers(user: TUser): TUsersActionsTypes {
  return {
    type: constants.USERS.USERS_REMOVE,
    user,
  }
}

export function updateUsers(users: TUser[]): TUsersActionsTypes {
  return {
    type: constants.USERS.USERS_UPDATE,
    users,
  }
}
