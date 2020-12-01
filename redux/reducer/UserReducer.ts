import CONST from '../constants'
import {
  IUserState,
  TUserActionTypes,
  IUserLoginAction,
  IUserUpdateAction,
  IUserTokenUpdateAction
} from '../../types/User'

const initialState: IUserState = {
  token: '',
  loggedIn: false,
  user: undefined
}

const userReducer = (state = initialState, action: TUserActionTypes): IUserState => {
  let act
  switch (action.type) {
    case CONST.USER_LOGIN:
      act = action as IUserLoginAction
      return { ...state, loggedIn: true, token: act.token, user: act.user}
    case CONST.USER_LOGOUT:
      act = action as IUserLoginAction
      return { ...state, loggedIn: false }
    case CONST.USER_TOKEN_UPDATE:
      act = action as IUserTokenUpdateAction
      return { ...state, token: act.token, loggedIn: true }
    case CONST.USER_UPDATE:
      act = action as IUserUpdateAction
      return { ...state, user: act.user}
    default: return state
  }
}

export default userReducer