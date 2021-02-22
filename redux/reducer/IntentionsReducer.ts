import constants from '@constants'
import {
  IIntentionsAdd,
  IIntentionsDelete,
  IIntentionsState,
  IIntentionsUpdate,
  TIntentionsActionsTypes,
} from 'types/Intentions'

const initialState: IIntentionsState = {
  intentions: [],
  count: 0,
}

const intentionsReducer = (
  state = initialState,
  action: TIntentionsActionsTypes
) => {
  let act: TIntentionsActionsTypes
  switch (action.type) {
    case constants.INTENTIONS.INT_ADD:
      act = action as IIntentionsAdd
      return {
        ...state,
        intentions: [...state.intentions, act.intention],
        count: state.count + 1,
      }
    case constants.INTENTIONS.INT_UPDATE:
      act = action as IIntentionsUpdate
      return {
        ...state,
        intentions: act.intentions,
        count: act.intentions.length,
      }
    case constants.INTENTIONS.INT_DELETE:
      act = action as IIntentionsDelete
      const title = act.intention.title
      const index = state.intentions.findIndex((elem) => elem.title === title)
      const newInt = [
        ...state.intentions.slice(0, index),
        ...state.intentions.slice(index + 1),
      ]
      return { ...state, intentions: newInt, count: state.count - 1 }
    default:
      return state
  }
}

export default intentionsReducer
