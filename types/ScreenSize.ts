import CONST from '../redux/constants'

interface IScreenSizeAction {
  type: typeof CONST.RESIZE
  width: number
}

export interface IScreenSizeState {
  width: number
}

export type TScreenSizeActionTypes = IScreenSizeAction