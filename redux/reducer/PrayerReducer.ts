import CONST from '@constants'
import {
  IPrayerState,
  TPrayerActionsTypes,
  IPrayersUpdate,
  IPrayersAdd,
  IPrayersDelete,
  IPrayerUpdate,
} from 'types/Prayer'

const initialState: IPrayerState = {
  prayers: [],
  count: 0,
}

const prayerReducer = (state = initialState, action: TPrayerActionsTypes) => {
  let act: TPrayerActionsTypes
  switch (action.type) {
    case CONST.PRAYER.PRAYERS_ADD:
      act = action as IPrayersAdd
      return {
        ...state,
        prayers: [...state.prayers, act.prayer],
        count: state.count + 1,
      }
    case CONST.PRAYER.PRAYERS_UPDATE:
      act = action as IPrayersUpdate
      return { ...state, prayers: act.prayers, count: act.prayers.length }
    case CONST.PRAYER.PRAYER_UPDATE:
      act = action as IPrayerUpdate
      const prayer = act.prayer
      const prayers = state.prayers
      const ind = prayers.findIndex((p) => p._id === prayer._id)
      prayers[ind] = { ...prayers[ind], ...prayer }
      return { ...state, prayers: prayers }
    case CONST.PRAYER.PRAYER_DELETE:
      act = action as IPrayersDelete
      const name = act.prayer.name
      const index = state.prayers.findIndex((elem) => elem.name === name)
      const newPrayers = [
        ...state.prayers.slice(0, index),
        ...state.prayers.slice(index + 1),
      ]
      return { ...state, prayers: newPrayers, count: state.count - 1 }
    default:
      return state
  }
}

export default prayerReducer
