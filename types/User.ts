import CONST from '../redux/constants'

export type TUser = {
  id: string
  firstname: string,
  lastname: string,
  email: string,
  admin: boolean
}

export type TSignInResponse = {
  token: string,
  user: TUser,
  error?: string
}

export type TRegisterResponse = {
  message: string,
  token: string,
  user: TUser,
  error?: string
}

export interface IUserLoginAction {
  type: typeof CONST.USER_LOGIN
  user: TUser,
  token: string,
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
  token: string,
  loggedIn: boolean,
  user: TUser | undefined
}

export type TUserActionTypes = IUserTokenUpdateAction | IUserLoginAction | IUserLogoutAction | IUserUpdateAction