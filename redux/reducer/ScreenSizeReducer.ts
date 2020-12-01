import CONST from '../constants'
import {
  IScreenSizeState,
  TScreenSizeActionTypes
} from '../../types/ScreenSize'

const initialState: IScreenSizeState = {
  width: 0
}

const screenSizeReducer = (state = initialState, action: TScreenSizeActionTypes) => {
  if (action.type === CONST.RESIZE)
    return { ...state, width: action.width }
  return state
}

export default screenSizeReducer