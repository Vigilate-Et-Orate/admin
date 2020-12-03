import CONST from '../constants'
import {
  TScreenSizeActionTypes
} from 'types/ScreenSize'

export function resizeScreen(width: number): TScreenSizeActionTypes {
  return {
    type: CONST.RESIZE,
    width
  }
}