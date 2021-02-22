import CONST from 'redux/constants'

export type TUser = {
  _id: string
  firstname: string
  lastname: string
  email: string
  admin: boolean
}

export interface IUsersState {
  users: TUser[]
  count: number
}

export type TSignInResponse = {
  token: string
  user: TUser
  error?: string
}

export type TRegisterResponse = {
  message: string
  token: string
  user: TUser
  error?: string
}

// Users

export interface IUsersAdd {
  type: typeof CONST.USERS.USERS_ADD
  user: TUser
}

export interface IUsersUpdate {
  type: typeof CONST.USERS.USERS_UPDATE
  users: TUser[]
}

export interface IUsersDelete {
  type: typeof CONST.USERS.USERS_REMOVE
  user: TUser
}

export type TUsersActionsTypes = IUsersAdd | IUsersUpdate | IUsersDelete

// User

export interface IUserLoginAction {
  type: typeof CONST.USER_LOGIN
  user: TUser
  token: string
  loggedIn: boolean
}

export interface IUserLogoutAction {
  type: typeof CONST.USER_LOGOUT
}

export interface IUserUpdateAction {
  type: typeof CONST.USER_UPDATE
  user: TUser
}

export interface IUserTokenUpdateAction {
  type: typeof CONST.USER_TOKEN_UPDATE
  token: string
}

export interface IUserState {
  token: string
  loggedIn: boolean
  user: TUser | undefined
}

export type TUserActionTypes =
  | IUserTokenUpdateAction
  | IUserLoginAction
  | IUserLogoutAction
  | IUserUpdateAction
