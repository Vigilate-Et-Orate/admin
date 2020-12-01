import {
  TUser,
  TUserActionTypes
} from '../../types/User'
import CONST from '../constants'

export function updateUser(user: TUser): TUserActionTypes {
  localStorage.setItem('__user', JSON.stringify(user))
  return {
    type: CONST.USER_UPDATE,
    user
  }
}

export function updateUserToken(token: string): TUserActionTypes {
  localStorage.setItem('__token', token)
  return {
    type: CONST.USER_TOKEN_UPDATE,
    token
  }
}

export function userLogin(token: string, user: TUser): TUserActionTypes {
  localStorage.setItem('__token', token)
  localStorage.setItem('__user', JSON.stringify(user))
  return {
    type: CONST.USER_LOGIN,
    token,
    user
  }
}

export function userLogout(): TUserActionTypes {
  localStorage.removeItem('__token')
  localStorage.removeItem('__user')
  return {
    type: CONST.USER_LOGOUT
  }
}